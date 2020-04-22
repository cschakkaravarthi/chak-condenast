import React, { useState } from 'react';
import { Container, Table, Row, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './../src/App.css'

function App() {

  const [data, setData] = useState({
    lst: [],
    itemList:[{value:0,label:'-- Select Item --'},{value:1,label:'Gunting'},{value:2,label:'Gunting For Man'}],
    byList:[{value:0,label:'--Select By--',Harga:0},{value:1,label:'Ardin',Harga:85000},{value:2,label:'Fajar',Harga:75000}],
    rowCount: 0
  });

  const onSelectedDDL = (e,id,type) => {
    e.preventDefault();
    const selectedValue = parseInt(e.target.value);
    let {lst,byList} = data;
    lst = lst.map((d) => {
      if(d.id === id){
        if(type === 'item') { d.item = selectedValue; } 
        else { 
          d.by = selectedValue;
          const hargaData = byList.filter((by)=> by.value === selectedValue);
          d.harga = hargaData ? hargaData[0].Harga : 0;
         }
      }
      return d;
    })
    setData({...data,lst});
  }

  const createDDL = (id,lst,selectedValue,type) => (
    <select value={selectedValue}  onChange={(e) => onSelectedDDL(e,id,type)}>
      {lst.map((data)=>(
       <option value={data.value}>{data.label}</option>
      ))}
    </select>
  );

  const deleteRow = (id) => {
    let {lst} = data;
    lst = lst.filter((d) => d.id !== id);
    setData({...data,lst});
  }

  const onSubmit = () => {
    const {lst} = data;
    console.log(lst);
  }

  const onQtyChange = (e,id) => {
    e.preventDefault();
    const value = parseInt(e.target.value);
    let {lst} = data;
    lst = lst.map((d) => {
      if(d.id === id){
         d.qty = value;
         d.subTotal = d.harga * value;
      }
      return d;
    })
    setData({...data,lst});
  }

  const addRowElement = (obj) => (
    <Row className="mt-3">
    <Col>{data.itemList && createDDL(obj.id,data.itemList,obj.item,'item')}</Col>
    <Col>{data.byList && createDDL(obj.id,data.byList,obj.by,'by')}</Col>
    <Col><input type='textbox' className="w-50" value={obj.harga} /></Col>
    <Col><input type='textbox' onChange={(e) => onQtyChange(e,obj.id)} className="w-50" value={obj.qty} /></Col>
    <Col><input type='textbox' className="w-50" value={obj.subTotal} /></Col>
    <Col className="text-center"><FontAwesomeIcon icon={faTrash} onClick={() => deleteRow(obj.id)} /></Col>
    </Row>
  );

  const addNew = () => {
    let {lst,rowCount} = data;
    lst.push({id:(rowCount = rowCount + 1),item:0,by:0,harga:0,qty:0,subTotal:0});
    setData({...data,lst,rowCount});
  }

  const { lst } = data;

  return (
    <Container>
      <header>
        <Row>
          <Col><span className="p-2 header">Conde Nast Code Test</span></Col>
        </Row>
      </header>
      <Table>
      <Row>
        <Col>Item</Col>
        <Col>By</Col>
        <Col>Harge</Col>
        <Col>Qty</Col>
        <Col>Sub Total</Col>
        <Col className="text-center">Act</Col>
      </Row>
          {
             lst && lst.map((d) => (
              addRowElement(d)
             ))
          }
       <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col className="text-center"><Button className="btn btn-success" onClick={addNew}>+ New</Button></Col>
      </Row>
      </Table>
      <footer>
        <div className="d-flex justify-content-around">
          <Button className="btn btn-success" onClick={onSubmit}>Submit</Button>
        </div>
      </footer>
    </Container>
  );
}

export default App;
