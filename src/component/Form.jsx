import React from 'react';
import Table from './Table';
import axios from 'axios';

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
        }).catch((err) => {
            console.log(err)
        })
    }

    btDelete = (index) => {
        let temp = [...this.state.todoList]
        temp.splice(index, 1)
        this.setState({ todoList: temp })
    }

    btEdit = (idx) => {
        this.setState({ selectedIdx: idx })
    }


    printData = () => {
        return this.state.todoList.map((value, index) => {
            if (this.state.selectedIdx == index) {
                return (
                    <div class="modal fade" id="exampleModalEdit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">EDIT TABLE</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div id="form" className="form-group" >
                                        <p>{index +1}</p>
                                        <p>Date</p>
                                        <input class="form-control" type="date" defaultValue={value.date} />
                                        <p>To Do</p>
                                        <input class="form-control" type="text" defaultValue={value.todo} />
                                        <p>Location</p>
                                        <input class="form-control" type="text" defaultValue={value.location} />
                                        <p>Note</p>
                                        <input class="form-control" type="text" defaultValue={value.note} />
                                        <p>Status</p>
                                        <input class="form-control" type="text" defaultValue={value.status} />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={this.btSubmit}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    // <tr>
                    //     <td>{index + 1}</td>
                    //     <td><input type="date" defaultValue={value.date} /></td>
                    //     <td><input type="text" defaultValue={value.todo} /></td>
                    //     <td><input type="text" defaultValue={value.location} /></td>
                    //     <td><input type="text" defaultValue={value.note} /></td>
                    //     <td><input type="text" defaultValue={value.status} /></td>
                    //     <td>
                    //         <button className="btn btn-danger" type="button" onClick={() => this.setState({ selectedIdx: null })}>Cancel</button>
                    //         <button className="btn btn-warning" type="button" >Save</button>
                    //     </td>
                    // </tr>
                )
            } else {
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
                            <button className="btn btn-warning" type="button" data-toggle="modal" data-target="#exampleModalEdit" onClick={() => this.btEdit(index)}>Edit</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    // CARA KEDUA MENDAPATKAN VALUE
    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
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
                <div className="d-flex justify-content-end">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalAddProduct">Add Product</button>
                    <div class="modal fade" id="exampleModalAddProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">ADD PRODUCT</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div id="form" className="form-group" >
                                        {/* CARA KEDUA MENDAPATKAN VALUE */}
                                        <p>Date</p>
                                        <input class="form-control" id="date" type="date" ref="iptDate" onChange={(event) => this.handleInput(event.target.value, "date")} />
                                        <p>To Do</p>
                                        <input class="form-control" id="todo" type="text" ref="iptTodo" onChange={(event) => this.handleInput(event.target.value, "todo")} />

                                        {/* CARA PERTAMA MENDAPATKAN VALUE */}
                                        {/* <p>To Do</p>
                                        <input id="todo" type="text" ref="iptTodo" onChange={this.handleInputTodo}  /> */}

                                        <p>Location</p>
                                        <input class="form-control" id="location" type="text" ref="iptLocation" onChange={(event) => this.handleInput(event.target.value, "location")} />
                                        <p>Note</p>
                                        <textarea class="form-control" id="note" type="text" ref="iptNote" onChange={(event) => this.handleInput(event.target.value, "note")} ></textarea>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={this.btSubmit}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="container-fluid">
                    <Table cetak={this.printData()} />
                </div>
            </div>
        );
    }
}

export default Form;