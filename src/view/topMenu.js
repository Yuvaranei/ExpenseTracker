import {Navbar,Nav,NavItem} from 'react-bootstrap'
import React from 'react'

export default function TopMenu(){
    return (
        <Navbar inverse collapseOnSelect>
                          <Navbar.Header>                            
                              <a className="brandName" href="#/home">Expense Tracker</a>                           
                            <Navbar.Toggle />
                          </Navbar.Header>
                          <Navbar.Collapse>
                            <Nav>
                              <a className="navItem" href="#/category">Category</a>
                              <a className="navItem" href="#/expense">Expense</a>                                           
                            </Nav>                            
                          </Navbar.Collapse>
                        </Navbar>
    )
}