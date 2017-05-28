import React from 'react'
import Constants from '../common/constants'
import { DropdownButton, Table, Modal, OverlayTrigger, Button, ButtonToolbar } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

export default class Category extends React.Component {

    constructor() {
        super()        
        this.state = {
            categoryName: "",
            categoryDescription: "",
            showModal: false,
            categories: JSON.parse(localStorage.getItem("categories")),
            expenses: JSON.parse(localStorage.getItem("expenses")),
            addCategoryFlag: false,
            disableUpdateDelete: true,
            disableAdd: true
        }
        this.categoryName = "";
        this.handleRadio = this.handleRadio.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.handleCategoryChanges = this.handleCategoryChanges.bind(this);
    }

    handleCategoryChanges(event) {
        let disableAdd = true;
        if (event.target.value.length > 0)
            disableAdd = false;
        this.setState({ categoryName: event.target.value, disableAdd });
    }

    addCategory() {
        let categoryEntry = {};
        categoryEntry.name = this.state.categoryName;
        categoryEntry.checked = false;
        categoryEntry.default = false;
        let categories = this.state.categories;
        categories.push(categoryEntry);
        localStorage.setItem("categories",JSON.stringify(categories))
        this.setState({ categories, showModal: false, categoryName : "" });        
    }

    updateCategory() {
        let updateIndex = 0;
        this.state.categories.map((item, index) => {
            if (item.checked == true) {
                updateIndex = index;
            }
        });
        let categories = this.state.categories;
        categories[updateIndex].name = this.state.categoryName;
        categories[updateIndex].checked = true;
        localStorage.setItem("categories",JSON.stringify(categories))
        this.setState({ categories, showModal: false, categoryName : "" });
    }

    deleteCategory() {
        let deleteIndex = 0;
        let checkedIndex;
        this.state.categories.map((item, index) => {
            if (item.checked == true) {
                checkedIndex = index;
                item.checked=false
                deleteIndex = index;
            }
        });
        let categories = this.state.categories;
        categories.splice(deleteIndex, 1);
        localStorage.setItem("categories",JSON.stringify(categories))
        this.setState({ categories, disableUpdateDelete: true, categoryName : "" });
    }

    handleRadio(event) {
        let categories = this.state.categories;
        let checkedCategory = "";
        let disableUpdateDelete = true;
        let categoryName = this.state.categories[event.target.id].name;
        categories.map((item, index) => {
            if (index == event.target.id) {
                item.checked = true;
                checkedCategory = item.name;
                disableUpdateDelete = false;
            }
            else
                item.checked = false;
        })
        this.setState({ categories, categoryName, disableUpdateDelete })
    }

    render() {
        let category_list = [];
        let that = this
        this.state.categories.map(function (item, index) {
            category_list.push(<tr key={index}><td><input name="categoryRadio" checked={item.checked} type="radio" id={index} onChange={that.handleRadio} />{item.name}</td></tr>)
        })

        let modalTitle = ""
        if (this.state.addCategoryFlag == true)
            modalTitle = "Add New Category"
        else
            modalTitle = "Update Category"

        let modalFooter = this.state.addCategoryFlag == true ? (
            this.state.disableAdd
                ?
                <Button bsStyle="primary" disabled value="Add">Add</Button> : <Button bsStyle="primary" value="Add" onClick={this.addCategory}>Add</Button>)
            :
            <Button bsStyle="primary" value="Update" onClick={this.updateCategory}>Update</Button>

        let addUpdateCategory = (
            <div className="col-md-12">
                <div className="col-md-12 formEntry">
                    <div className="col-md-4">
                        Category Name:
                    </div>
                    <div className="col-md-8">
                        <input className="inputForm" type="text" name="categoryName" value={this.state.categoryName} onChange={this.handleCategoryChanges} />
                    </div>
                </div>
            </div>
        );

        return (
            <div className="col-md-12">
                <header> <h1>Category Details</h1></header>
                <section className="col-md-10">
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category_list}
                        </tbody>
                    </Table>
                </section>
                <section className="col-md-2">
                    <ButtonToolbar>
                        {
                            this.state.disableUpdateDelete == true ? <Button disabled>Update</Button> :
                                <Button onClick={() => { this.setState({ addCategoryFlag: false, showModal: true }) }}>Update</Button>
                        }
                    </ButtonToolbar>
                    <ButtonToolbar>
                        {
                            this.state.disableUpdateDelete == true ? <Button disabled>Delete</Button> :
                                <Button onClick={this.deleteCategory}>Delete</Button>
                        }
                    </ButtonToolbar>
                </section>
                <div className="col-md-12">
                    <Button value="Add New Category" bsStyle="success" bsSize="large" onClick={() => this.setState({ showModal: true, addCategoryFlag: true })}>+ Add New Category</Button>
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

                <hr/>
                <footer className="col-md-12 nomargin">
                <hr/>
                    <div>&copy; 2017 Expense Tracker</div>
                </footer>
            </div>
        )
    }
}