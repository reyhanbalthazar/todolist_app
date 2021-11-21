import React from 'react';
import Table from './Table';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todoList: [
                {
                    id: 1,
                    date: "20/11/2021",
                    todo: "Intro ReactJS",
                    location: "https://images.unsplash.com/photo-1633114128814-11fac33f707b?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    note: "Prepare VSCODE, Node js and CRA",
                    status: "Done",
                }
            ]
        }
    }


    btSubmit = () => {
        let newtodoList=this.state.todoList
        newtodoList.push({
            date:this.refs.iptDate.value,
            todo:this.refs.iptTodo.value,
            location:this.refs.iptLocation.value,
            note:this.refs.iptNote.value,
            status:"Done"
        })
        this.setState({newtodoList})
    }

    printData = () => {
        return this.state.todoList.map((value, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{value.date}</td>
                    <td>{value.todo}</td>
                    <td><img src={value.location} width="100%" alt="..." /></td>
                    <td>{value.note}</td>
                    <td>{value.status}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container-fluid row mt-4">
                <div id="form" className="container-fluid col-2">
                    <p>Date</p>
                    <input id="date" type="text" ref="iptDate" />
                    <p>To Do</p>
                    <input id="todo" type="text" ref="iptTodo" />
                    <p>Location</p>
                    <input id="location" type="text" ref="iptLocation" />
                    <p>Note</p>
                    <textarea id="note" type="text" ref="iptNote"></textarea>
                    <button type="button" className="btn btn-primary" onClick={this.btSubmit}>Submit</button>
                </div>
                <div className="container-fluid col-9">
                    <Table cetak={this.printData()} />
                </div>
            </div>
        );
    }
}

export default Form;