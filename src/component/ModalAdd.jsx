import React from 'react';

class ModalAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="d-flex justify-content-end">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalAddProduct">Add Product</button>
                <div className="modal fade" id="exampleModalAddProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">ADD PRODUCT</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div id="form" className="form-group" >
                                    {/* CARA KEDUA MENDAPATKAN VALUE */}
                                    <p>Date</p>
                                    <input className="form-control" id="date" type="date" value={this.props.date} onChange={(event) => this.props.handleInput(event.target.value, "date")} />
                                    <p>To Do</p>
                                    <input className="form-control" id="todo" type="text" value={this.props.todo} onChange={(event) => this.props.handleInput(event.target.value, "todo")} />

                                    {/* CARA PERTAMA MENDAPATKAN VALUE */}
                                    {/* <p>To Do</p>
                                        <input id="todo" type="text" ref="iptTodo" onChange={this.handleInputTodo}  /> */}

                                    <p>Location</p>
                                    <input class="form-control" id="location" type="text" value={this.props.location} onChange={(event) => this.props.handleInput(event.target.value, "location")} />
                                    <p>Note</p>
                                    <textarea class="form-control" id="note" type="text" value={this.props.note} onChange={(event) => this.props.handleInput(event.target.value, "note")} ></textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={this.props.btSubmit}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ModalAdd;