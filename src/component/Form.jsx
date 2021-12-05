import React from 'react';
import axios from 'axios';
import Table from './Table';
import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            todo: "",
            location: "",
            note: "",
            selectedIdx: null,
            todoList: []
        }
    }

    // untuk menjalankan sebuah fungsi secara otomatis, pertama kali saat component atau page react js di render
    componentDidMount() {
        // fungsi yang digunakan untuk melakukan request data pertama kali ke backend
        this.getData();
    }

    getData = () => {
        // AXIOS : melakukan request data ke backend atau API
        axios.get(`http://localhost:2000/todoList`)
            .then((response) => {
                // Masuk kedalam then ketika berhasil mendapat response dari json-server
                console.log(response.data)
                // Menyimpan data response kedalam state
                this.setState({ todoList: response.data })
            }).catch((err) => {
                // Masuk kedalam catch ketika gagal mendapat response dari json-server
                console.log(err)
            })
    }

    btSubmit = () => {
        let { date, todo, location, note, } = this.state //desctructure
        // axios
        axios.post(`http://localhost:2000/todoList`, {
            date, todo, location, note, status: "on going"
        }).then((response) => {
            // memanggil data terbaru untuk memperbarui data pada state
            this.getData()
            this.setState({
                date: "",
                todo: "",
                location: "",
                note: ""
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    btDelete = (index) => {

        axios.delete(`http://localhost:2000/todoList/${this.state.todoList[index].id}`)
            .then((response) => {
                this.getData()
            }).catch((err) => {
                console.log(err)
            })  
    }

    btEdit = (idx) => {
        this.setState({ selectedIdx: idx })
    }


    printData = () => {
        return this.state.todoList.map((value, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{value.date}</td>
                    <td>{value.todo}</td>
                    <td><img src={value.location} width="25%" alt="..." /></td>
                    <td>{value.note}</td>
                    <td>{value.status}</td>
                    <td>
                        <button className="btn btn-danger" type="button" onClick={() => this.btDelete(index)}>Delete</button>
                        <button className="btn btn-warning" type="button" data-toggle="modal" data-target="#editModal" onClick={() => this.btEdit(index)}>Edit</button>
                    </td>
                </tr>
            )
        })
    }

    // CARA KEDUA MENDAPATKAN VALUE
    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
    }

    btSave = () => {
        let { date, todo, location, note, todoList, selectedIdx } = this.state
        console.log(date, todo, location, note)
        let editData = {
            date: date == "" ? todoList[selectedIdx].date : date, //untuk menghindari empty string dan mengambil value, dari value sebelum di edit
            todo: todo == "" ? todoList[selectedIdx].todo : todo, //untuk menghindari empty string dan mengambil value, dari value sebelum di edit
            location: location == "" ? todoList[selectedIdx].location : location, //untuk menghindari empty string dan mengambil value, dari value sebelum di edit
            note: note == "" ? todoList[selectedIdx].note : note //untuk menghindari empty string dan mengambil value, dari value sebelum di edit
        }
        axios.patch(`http://localhost:2000/todoList/${todoList[selectedIdx].id}`, editData)
            .then((response) => {
                this.getData()
                this.setState({
                    date: "",
                    todo: "",
                    location: "",
                    note: "",
                    selectedIdx: null
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    // CARA PERTAMA MENDAPATKAN VALUE
    // handleInputTodo = (event) => {
    //     let value = event.target.value
    //     console.log(value)
    //     this.setState({ todo: value })
    // }


    render() {
        return (
            <div className="m-4">
                <div className="container-fluid">
                    <ModalAdd
                        handleInput={this.handleInput}
                        date={this.state.date}
                        todo={this.state.todo}
                        location={this.state.location}
                        note={this.state.note}
                        btSubmit={this.btSubmit}
                    />
                    {
                        this.state.todoList.length > 0 && this.state.selectedIdx != null ?
                            <ModalEdit
                                date={this.state.todoList[this.state.selectedIdx].date}
                                todo={this.state.todoList[this.state.selectedIdx].todo}
                                location={this.state.todoList[this.state.selectedIdx].location}
                                note={this.state.todoList[this.state.selectedIdx].note}
                                handleInput={this.handleInput}
                                btCancel={() => this.setState({ selectedIdx: null })}
                                btSave={this.btSave}
                            />
                            : null
                    }
                    <Table cetak={this.printData()} />
                </div>
            </div>
        );
    }
}

export default Form;