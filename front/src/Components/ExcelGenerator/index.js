import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';

import { apiEquiblocks } from '../../api/apiEquiblocks';
import { apiChallenge } from '../../api/apiChallenge';

import './ExcelGenerator.css';

export default function ExcelGenerator() {
    const [workbook, setWorkbook] = useState(null);
    const [playersData, setPlayersData] = useState([]);
    const [sortedData, setSortedData] = useState(null);
    const [sortBy, setSortBy] = useState({ column: null, ascending: true });

    const [f1, setF1] = useState(0);
    const [f2, setF2] = useState(0);
    const [f3, setF3] = useState(0);
    const [f4, setF4] = useState(0);
    const [f5, setF5] = useState(0);
    const [tempo, setTempo] = useState(0);
    const [savedTempo, setSavedTempo] = useState(0);

    async function getPlayers() {
        apiEquiblocks.get(`/getplayers`).then((response) => {
            if (!response.data.players) {
                console.log("Erro em getplayers")
            }
            else {
                setPlayersData(response.data.players);
                setSortedData(response.data.players);
            }
        }).catch((error) => {
            console.log("Error fetching players data:")
            console.error(error)
        })
    }

    async function getValues() {
        apiChallenge.get(`/getvalues`).then((response) => {
            setF1(response.data.values[0])
            setF2(response.data.values[1])
            setF3(response.data.values[2])
            setF4(response.data.values[3])
            setF5(response.data.values[4])
        }).catch((error) => {
            console.log("Error fetching values:")
            console.error(error)
        })
    }

    async function getTime() {
        apiChallenge
            .get(`/gettime`)
            .then((response) => {
                console.log(response.data.hora);
                console.log(response.data.minuto);

                const savedTime = response.data.hora.toString() +':'+ response.data.minuto.toString();
                setSavedTempo(savedTime);
                console.log(savedTempo)
            })
            .catch((error) => {
                console.log("Error fetching new values");
                console.error(error);
            });
    }

    useEffect(() => {
        getValues();
        getPlayers();
        getTime();
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
        const confirmed = window.confirm("Tem certeza que deseja apagar os dados do MongoDB?");
        if (confirmed) {
            try {
                // Assuming apiEquiblocks is an Axios instance
                const response = await apiEquiblocks.get(`/deleteplayers`);
                console.log(response);
                setPlayersData([]);
                setSortedData([]);
            } catch (error) {
                console.error('Error fetching players data:', error);
            }
            return;
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
            XLSX.utils.sheet_add_aoa(ws, [["Nome", "Data de Nascimento", "Tempo", "Tentativas", "Quantidade", "100", "200", "500", "700", "1000"]]);

            playersData.forEach(player => {
                XLSX.utils.sheet_add_aoa(ws, [[player.nome, player.data, player.tempo, player.tentativas, player.quantidade, player.f1, player.f2, player.f3, player.f4, player.f5]], { origin: -1 });
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

    function saveNewValues() {
        apiChallenge
            .post(`/postvalues`, { "newValues": [f1, f2, f3, f4, f5] })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log("Error fetching new values");
                console.error(error);
            });

        alert("Novos valores enviados. Será atualizado em alguns instantes!")
    }

    function saveNewTempo() {
        if (tempo.toString() == 0) {
            alert("Tempo inválido!");
        }

        else {
            apiChallenge
                .post(`/posttime`, { "hora": parseInt(tempo.toString().split(":")[0]), "minuto": parseInt(tempo.toString().split(":")[1]) })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log("Error fetching new values");
                    console.error(error);
                });

            alert("Novo tempo enviado. Será atualizado em alguns instantes!")
        }
    }

    return (
        <div className="excel-generator-container">
            <div className='excel-btn'>
                <div>
                    <button onClick={resetSort}>Redefinir ordem</button>
                    <button onClick={clearMongoDB} style={{ marginLeft: '1em' }}>Limpar Participantes</button>
                </div>
                <div className='inputsTitle'>
                    <h2>Alterar Tempo</h2>
                    <input type="time" value={tempo} onChange={(e) => setTempo(e.target.value)}></input>
                    <button onClick={saveNewTempo} style={{ marginTop: '0.5em' }}> Salvar Tempo</button>
                </div>
                <div className="inputsStyles">
                    <div className='inputsTitle'>
                        <h2>Alterar Valores</h2>
                    </div>
                    <div className='inputs'>
                        <input type="number" value={f1} onChange={(e) => setF1(e.target.value)}></input>
                        <input type="number" value={f2} onChange={(e) => setF2(e.target.value)}></input>
                        <input type="number" value={f3} onChange={(e) => setF3(e.target.value)}></input>
                        <input type="number" value={f4} onChange={(e) => setF4(e.target.value)}></input>
                        <input type="number" value={f5} onChange={(e) => setF5(e.target.value)}></input>
                    </div>
                    <button onClick={saveNewValues} style={{ marginTop: '0.5em' }}> Salvar Valores</button>
                </div>
                <div className="saveFile">
                    <input type="file" onChange={loadExcelFile} />
                    <button onClick={saveExcelFile} style={{ marginTop: '0.5em' }}>Salvar arquivo</button>
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
                                <th onClick={() => sortData('tentativas')}>Tentativas</th>
                                <th onClick={() => sortData('qtd_formas')}>Quantidade</th>
                                <th onClick={() => sortData('acertos')}>Acertos %</th>
                                <th onClick={() => sortData('f1')}>{f1}</th>
                                <th onClick={() => sortData('f2')}>{f2}</th>
                                <th onClick={() => sortData('f3')}>{f3}</th>
                                <th onClick={() => sortData('f4')}>{f4}</th>
                                <th onClick={() => sortData('f5')}>{f5}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.nome}</td>
                                    <td>{player.data}</td>
                                    <td>{player.tempo}</td>
                                    <td>{player.tentativas}</td>
                                    <td>{player.qtd_formas}</td>
                                    <td style={{ backgroundColor: player.acertos === 100 ? '#C6F7D0' : (player.acertos === 75 || player.acertos === 50) ? '#ffffb0' : '#FFC6C6' }}>{player.acertos}</td>
                                    <td style={{ backgroundColor: player.f1 == f1 ? '#C6F7D0' : '#FFC6C6' }}>{player.f1}</td>
                                    <td style={{ backgroundColor: player.f2 == f2 ? '#C6F7D0' : '#FFC6C6' }}>{player.f2}</td>
                                    <td style={{ backgroundColor: player.f3 == f3 ? '#C6F7D0' : '#FFC6C6' }}>{player.f3}</td>
                                    <td style={{ backgroundColor: player.f4 == f4 ? '#C6F7D0' : '#FFC6C6' }}>{player.f4}</td>
                                    <td style={{ backgroundColor: player.f5 == f5 ? '#C6F7D0' : '#FFC6C6' }}>{player.f5}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
