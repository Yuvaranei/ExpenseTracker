import React, { Component } from 'react';
import Constants from '../common/constants';
import { DropdownButton, Table, Modal, OverlayTrigger, Button, ButtonToolbar } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
export default class Expenses extends Component {
    constructor() {
        super();
        this.state = {
            expenses: JSON.parse(localStorage.getItem("expenses")),
            expenseAmount: "",
            showModal: false,
            expenseDate: moment(),
            categories: JSON.parse(localStorage.getItem("categories")),
            addExpenseFlag: false,
            disableUpdateDelete: true,
            disableAdd: true
        }
        this.expenseCategory = "";
        this.handleRadio = this.handleRadio.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.deleteExpense = this.deleteExpense.bind(this);
        this.updateExpense = this.updateExpense.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.addExpense = this.addExpense.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    updateExpense() {
        let updateIndex = 0;
        this.state.expenses.map((item, index) => {
            if (item.checked == true) {
                updateIndex = index;
            }
        });

        let expenses = this.state.expenses;
        expenses[updateIndex].category = this.expenseCategory;
        expenses[updateIndex].amount = this.state.expenseAmount;
        expenses[updateIndex].date = this.state.expenseDate;
        expenses[updateIndex].date_ms = "" + this.state.expenseDate;
        expenses[updateIndex].checked = false;
        localStorage.setItem("expenses", JSON.stringify(expenses))
        this.setState({ expenses, showModal: false, expenseAmount: "", expenseDate: "" });
    }

    deleteExpense() {
        let deleteIndex = 0;
        this.state.expenses.map((item, index) => {
            if (item.checked == true) {
                deleteIndex = index;
            }

        });

        let expenses = this.state.expenses;
        expenses.splice(deleteIndex, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses))
        this.setState({ expenses, disableUpdateDelete: true });
    }

    handleRadio(event) {
        let expenses = this.state.expenses;
        let checkedCategory = "";
        let expenseDate = moment();
        let disableUpdateDelete = true;
        let expenseAmount = "";
        expenses.map((item, index) => {
            if (index == event.target.id) {
                item.checked = true;
                item.selected = true;
                checkedCategory = item.category;
                expenseDate = item.date;
                expenseAmount = item.amount;
                disableUpdateDelete = false;
            }
            else
                item.checked = false;
        })
        let categories = this.state.categories;
        categories.map((item) => {
            if (item.name == checkedCategory) {
                item.selected = true
            }
            else
                item.selected = false
        })
        this.setState({ expenses, categories, expenseDate, expenseAmount, disableUpdateDelete })
    }

    handleCategoryChange(event) {
        this.expenseCategory = event.target.value;
        let categories = this.state.categories;
        categories.map((item, index) => {
            if (item.name == event.target.value) {
                item.selected = true;
            }
            else
                item.selected = false;
        }

        )

        this.setState({ categories });
    }

    handleAmountChange(event) {
        let disableAdd = true;
        if (event.target.value.length > 0)
            disableAdd = false;
        this.setState({ expenseAmount: event.target.value, disableAdd });
    }

    addExpense() {
        let expenseEntry = {};
        expenseEntry.category = this.expenseCategory;
        expenseEntry.amount = this.state.expenseAmount;
        expenseEntry.date = this.state.expenseDate;
        expenseEntry.date_ms = "" + this.state.expenseDate;
        expenseEntry.checked = false;
        let expenses = this.state.expenses;;
        expenses.push(expenseEntry);
        localStorage.setItem("expenses", JSON.stringify(expenses))
        this.setState({ expenses, showModal: false, expenseAmount: "", expenseDate: "" });
    }

    handleDateChange(date) {

        this.setState({ expenseDate: date });
    }

    render() {
        let modalTitle = ""
        if (this.state.addExpenseFlag == true) {
            modalTitle = "Add New Expense Entry"
        }
        else
            modalTitle = "Update Expense Details"

        let modalFooter = this.state.addExpenseFlag == true ? (
            this.state.disableAdd ? <Button bsStyle="primary" disabled value="Add">Add</Button> : <Button bsStyle="primary" value="Add" onClick={this.addExpense}>Add</Button>) :
            (<Button bsStyle="primary" value="Update" onClick={this.updateExpense}>Update</Button>)
        let dropdownItems = [];
        this.state.categories.map((item, index) => {
            if (index == 0)
                this.expenseCategory = item.name;

            if (item.selected == true) {
                dropdownItems.push(<option selected key={index}>{item.name}</option>);
                this.expenseCategory = item.name;
            }

            else
                dropdownItems.push(<option key={index}>{item.name}</option>);
        })

        let tableData = [];
        if (this.state.expenses.length <= 0) {
            tableData.push(<tr><td><em>No expenses Added so far.. Click the button below to get started</em></td><td>-</td><td>-</td></tr>)
        }
        else {
            let that = this;
            this.state.expenses.map((item, index) => {
                var dateVal = "/Date(" + item.date_ms + ")/";
                var myDate = new Date(parseFloat((dateVal).substr(6)))
                let displayDate = myDate.toLocaleDateString()
                tableData.push(<tr key={index}><td><input name="expenseRadio" type="radio" checked={item.checked} id={index} onChange={that.handleRadio} />{item.category}</td><td>{item.amount}</td><td>{displayDate}</td></tr>);
            })
        }

        let addUpdateCategory = (
            <div className="col-md-12">
                <div className="col-md-12 formEntry">
                    <div className="col-md-4">
                        Category:
                    </div>
                    <div className="col-md-8">
                        <select className="inputForm" onChange={this.handleCategoryChange}>
                            {dropdownItems}
                        </select>
                    </div>
                </div>
                <div className="col-md-12 formEntry">
                    <div className="col-md-4">
                        Amount in INR:
                    </div>
                    <div className="col-md-8">
                        <input className="inputForm" type="number" min="1" name="expenseAmount" value={this.state.expenseAmount} onChange={this.handleAmountChange} />
                    </div>
                </div>
                <div className="col-md-12 formEntry">
                    <div className="col-md-4">
                        Date:
                    </div>
                    <div className="col-md-8">
                        <DatePicker className="inputForm" selected={this.state.expenseDate} onChange={this.handleDateChange} />
                    </div>
                </div>
            </div>);

        return (
            <div className="col-md-12">
                <header> <h1>Expenses Details</h1></header>
                <section className="col-md-10">
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Expense</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </Table>
                </section>
                <section className="col-md-2">
                    <ButtonToolbar>
                        {
                            this.state.disableUpdateDelete == true ? <Button disabled>Update</Button> :
                                <Button onClick={() => { this.setState({ addExpenseFlag: false, showModal: true }) }}>Update</Button>
                        }

                    </ButtonToolbar>
                    <ButtonToolbar>
                        {
                            this.state.disableUpdateDelete == true ? <Button disabled>Delete</Button> :
                                <Button onClick={this.deleteExpense}>Delete</Button>
                        }

                    </ButtonToolbar>
                </section>

                <div className="col-md-12">
                    <Button value="Add New Expense Entry" bsStyle="success" bsSize="large" onClick={() => this.setState({ showModal: true, addExpenseFlag: true })}>+ Add New Expense Entry</Button>
                </div>

                <Modal show={this.state.showModal} onHide={() => { this.setState({ showModal: false }) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {addUpdateCategory}
                    </Modal.Body>
                    <Modal.Footer>
                        {modalFooter}
                        <Button onClick={() => { this.setState({ showModal: false }) }}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <hr />
                <footer className="col-md-12 nomargin">
                    <hr />
                    <div>&copy; 2017 Expense Tracker</div>
                </footer>

            </div>
        )
    }
}