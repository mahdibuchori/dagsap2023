import React from 'react';
import { Accordion, Badge, Card, Col, Form } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';

export const PrevPengadaan = ({data}) => {
  const navigate = useNavigate();
  return (
    <>
    {data === undefined ? 
      <Card mt-2 bg='white'></Card>
      : 
      <Accordion>
        {
          data.map((x,i) =>{
            
            return(
              x.newPar.map((a,z)=>{
                let statusn = "";
                let warna = "Success"
                if(a.noAkun === "" && a.po !== ""){
                  statusn = "Closed";
                  warna = "success";
                }
                else if(a.noAkun === "" && a.po === ""){
                  statusn = "Progress";
                  warna = "primary";
                }
                else{
                  statusn = "Open";
                  warna = "danger"
                }
                return (
                  <Accordion.Item eventKey={x}>
                    <Accordion.Header>
                      <div className="p-0 ms-1 me-auto">
                        <h6>{x.id_Pengadaan}</h6>
                        <h6>{x.t_pengadaan}</h6>
                        <h6>{a.po}</h6>
                      </div>
                      <Badge bg={warna} pill>{statusn}</Badge>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label>Qty</Form.Label>
                        <NumericFormat 
                          name="qty"
                          style={{textAlign:'end'}}
                          customInput={Form.Control}
                          thousandSeparator={true}
                          value={a.qty}
                          disabled
                        />
                      </Form.Group>

                      {statusn === "Open" ?
                        <div className="bg-light mt-1" style={{textAlign: 'end'}}>  
                            <button 
                              type="button" 
                              className="btn btn-primary float-right"
                              onClick={(e)=>{
                                console.log(x)
                                navigate(`/form/pengadaan/update`,{state:{
                                  data : x,
                                  po : a.po
                                }});
                              }}
                            >
                              Update
                            </button>
                        </div>
                        :
                        <h6> </h6>
                      } 
                    </Accordion.Body>
                  </Accordion.Item>
                )
              })
            )
          })
        }
      </Accordion>
    }
    </>
  )
}
