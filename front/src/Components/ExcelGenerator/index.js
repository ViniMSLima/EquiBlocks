import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import './ExcelGenerator.css'; // Importando o arquivo de estilos

export default function ExcelGenerator() {
    const [workbook, setWorkbook] = useState(null);
    const [playersData, setPlayersData] = useState([]);

    useEffect(() => {
        if (workbook) {
            const ws = workbook.Sheets[workbook.SheetNames[0]];
            const players = JSON.parse(localStorage.getItem("playerInfo"));
            const newPlayersData = [];

            players.forEach(player => {
                XLSX.utils.sheet_add_aoa(ws, [[player.nome, player.data, player.tempo, player.f1, player.f2, player.f3, player.f4, player.f5]], { origin: -1 });
                newPlayersData.push([player.nome, player.data, player.tempo, player.f1, player.f2, player.f3, player.f4, player.f5]);
            });

            setPlayersData(newPlayersData);
            alert("Dados salvos no .xlsx");
        }
    }, [workbook]);

    function loadExcelFile(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const loadedWorkbook = XLSX.read(data, { type: "array" });
            setWorkbook(loadedWorkbook);
        };

        reader.readAsArrayBuffer(file);
    }

    function saveExcelFile() {
        if (workbook) {
            const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "dados_editados.xlsx");
        } else {
            alert("Por favor, selecione um arquivo Excel antes de salvar.");
        }
    }

    // Função para converter de string para ArrayBuffer
    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    return (
        <div className="excel-generator-container">
            <input type="file" onChange={loadExcelFile} />
            <button onClick={saveExcelFile}>Salvar arquivo</button>
            {playersData.length > 0 && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Data</th>
                                <th>Tempo</th>
                                <th>F1</th>
                                <th>F2</th>
                                <th>F3</th>
                                <th>F4</th>
                                <th>F5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playersData.map((player, index) => (
                                <tr key={index}>
                                    {player.map((data, dataIndex) => (
                                        <td key={dataIndex}>{data}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
