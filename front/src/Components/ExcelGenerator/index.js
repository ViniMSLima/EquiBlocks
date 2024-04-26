import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';

import './ExcelGenerator.css';

export default function ExcelGenerator() {
    const [workbook, setWorkbook] = useState(null);
    const [playersData, setPlayersData] = useState([]);
    const [sortedData, setSortedData] = useState(null);
    const [sortBy, setSortBy] = useState({ column: null, ascending: true });

    async function getPlayers() {
        try {
            const res = await axios.get('https://10.196.20.101:8080/api/getplayers');
            setPlayersData(res.data.players);
            setSortedData(res.data.players);
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    }

    useEffect(() => {
        getPlayers();
    }, []);

    function sortData(column) {
        const ascending = sortBy.column === column ? !sortBy.ascending : true;
        const sortedPlayers = [...sortedData].sort((a, b) => {
            if (column === 'tempo' || column === 'data') {
                return ascending ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
            } else {
                return ascending ? a[column] - b[column] : b[column] - a[column];
            }
        });
        setSortBy({ column, ascending });
        setSortedData(sortedPlayers);
    }

    function resetSort() {
        setSortedData(playersData); // Reseta para os dados originais
        setSortBy({ column: null, ascending: true }); // Reseta para a ordem padrão
    }

    async function clearMongoDB() {
        try {
            const res = await axios.get('https://10.196.20.101:8080/api/deleteplayers');
            setPlayersData([]);
            setSortedData([]);
        } catch (error) {
            console.error('Error fetching game data:', error);
        }
    }

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
            const ws = workbook.Sheets[workbook.SheetNames[0]];
            XLSX.utils.sheet_add_aoa(ws, [["Nome", "Data de Nascimento", "Tempo", "F1", "F2", "F3", "F4", "F5"]]);

            playersData.forEach(player => {
                XLSX.utils.sheet_add_aoa(ws, [[player.nome, player.data, player.tempo, player.f1, player.f2, player.f3, player.f4, player.f5]], { origin: -1 });
            });

            const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "dados_editados.xlsx");
            alert("Dados salvos no .xlsx");
        } else {
            alert("Por favor, selecione um arquivo Excel antes de salvar.");
        }
    }

    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    return (
        <div className="excel-generator-container">
            <div className='excel-btn'>
                <div>
                    <button onClick={resetSort}>Redefinir ordem</button>
                    <button onClick={clearMongoDB}>Limpar MongoDB</button>
                </div>
                <div>
                    <input type="file" onChange={loadExcelFile} />
                    <button onClick={saveExcelFile}>Salvar arquivo</button>
                </div>
            </div>
            {playersData.length > 0 && (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th onClick={() => sortData('nome')}>Nome</th>
                                <th onClick={() => sortData('data')}>Data</th>
                                <th onClick={() => sortData('tempo')}>Tempo</th>
                                <th onClick={() => sortData('f1')}>F1</th>
                                <th onClick={() => sortData('f2')}>F2</th>
                                <th onClick={() => sortData('f3')}>F3</th>
                                <th onClick={() => sortData('f4')}>F4</th>
                                <th onClick={() => sortData('f5')}>F5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.nome}</td>
                                    <td>{player.data}</td>
                                    <td>{player.tempo}</td>
                                    <td style={{ backgroundColor: player.f1 === 2 ? '#C6F7D0' : '#FFC6C6'}}></td>
                                    <td style={{ backgroundColor: player.f2 === 2 ? '#C6F7D0' : '#FFC6C6'}}></td>
                                    <td style={{ backgroundColor: player.f3 === 2 ? '#C6F7D0' : '#FFC6C6'}}></td>
                                    <td style={{ backgroundColor: player.f4 === 2 ? '#C6F7D0' : '#FFC6C6'}}></td>
                                    <td style={{ backgroundColor: player.f5 === 2 ? '#C6F7D0' : '#FFC6C6'}}></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
