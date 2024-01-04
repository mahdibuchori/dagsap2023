import React from 'react'
import { Container } from 'react-bootstrap';
import './home.css'

const Home = () => {
  return (
    <div className='setContain'>
      <Container fluid>
        <h5>Dashboard</h5>
          <div class="d-flex flex-row flex-nowrap overflow-auto">
            <div class="card card-block mx-2" style={{minWidth: '300px'}}>Card</div>
            <div class="card card-block mx-2" style={{minWidth: '300px'}}>Card</div>
            <div class="card card-block mx-2" style={{minWidth: '300px'}}>Card</div>  
            <div class="card card-block mx-2" style={{minWidth: '300px'}}>Card</div>
            <div class="card card-block mx-2" style={{minWidth: '300px'}}>Card</div>
            <div class="card card-block mx-2" style={{minWidth: '300px'}}>Card</div>    
            <div class="card card-block mx-2" style={{minWidth: '300px'}}>Card</div>
            <div class="card card-block mx-2" style={{minWidth: '300px'}}>Card</div>
            <div class="card card-block mx-2" style={{minWidth: '300px'}}>Card</div>              
          </div>
 
          <div className='row mb-5'>
            <div className='mb-4 col-sm-12 col-md-12 col-lg-8'>
              <div className="h-100 card card-small">
                <div className="border-bottom card-header">
                  <h6 className="m-0">Users Overview</h6>
                </div>
                <div className="pt-0 card-body">
                  <div className="chartjs-size-monitor" style={{position: 'absolute', inset: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                    <div className="chartjs-size-monitor-expand" style={{position:'absolute', left:0, top:0, right:0, bottom:0, overflow:'hidden',pointerEvents:'none', visibility:'hidden', zIndex:-1}}>
                      <div style={{position:'absolute', width:'1000000px', height:'1000000px', left:0, top:0}}></div>
                    </div>
                    
                    <div className="chartjs-size-monitor-shrink" style={{position:'absolute', left:0, top:0, right:0, bottom:0, overflow:'hidden',pointerEvents:'none', visibility:'hidden', zIndex:-1}}>
                      <div style={{position:'absolute', width:'1000000px', height:'1000000px', left:0, top:0}}></div>
                    </div>
                    
                  </div>
                  
                  <div className="border-bottom py-2 bg-light row">
                    <div className="d-flex mb-2 mb-sm-0 col-sm-6">
                      <div className="d-flex my-auto date-range input-group">
                        <div className="react-datepicker-wrapper">
                          <div className="react-datepicker__input-container">
                            <input type="text" placeholder="Start Date" className="text-center form-control form-control-sm" value=""/>
                          </div>
                        </div>
                        
                        <div class="react-datepicker-wrapper">
                          <div class="react-datepicker__input-container">
                            <input type="text" placeholder="End Date" class="text-center form-control form-control-sm" value=""/>
                          </div>
                        </div>
                        
                        <div class="input-group-append">
                          <span class="input-group-text">
                            <i class="material-icons"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col">
                      <button className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0 btn btn-primary btn-sm">
                        View Full Report →
                      </button>
                    </div>
                  </div>
                  
                  <canvas height="343" width="860" style={{display: 'block', width: '313px', height: '125px'}} className="chartjs-render-monitor"></canvas>
                </div>
              </div>
            </div>

            <div className='mb-4 col-sm-12 col-md-12 col-lg-8'>
              <div className="h-100 card card-small">
                <div className="border-bottom card-header">
                  <h6 className="m-0">Users by device</h6>
                </div>
              
                <div className="d-flex py-0 card-body">
                  <div className="chartjs-size-monitor" style={{position: 'absolute', inset: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                    <div className="chartjs-size-monitor-expand" style={{position:'absolute', left:0, top:0, right:0, bottom:0, overflow:'hidden',pointerEvents:'none', visibility:'hidden', zIndex:-1}}>
                      <div style={{position:'absolute', width:'1000000px', height:'1000000px', left:0, top:0}}></div>
                    </div>
                  
                    <div className="chartjs-size-monitor-shrink" style={{position: 'absolute', inset: '0px', overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}>
                      <div style={{position:'absolute', width:'1000000px', height:'1000000px', left:0, top:0}}></div>
                    </div>
                  </div>
                
                  <canvas height="629" className="blog-users-by-device m-auto chartjs-render-monitor" width="860" style={{display: '0', width: '313px', height: '229px'}}></canvas>
                </div>
            
                <div className="border-top card-footer">
                  <div className="row">
                    <div className="col">
                      <select className="form-control custom-select form-control-sm custom-select-sm" style={{maxWidth: '130px'}}>
                        <option value="last-week">Last Week</option>
                        <option value="today">Today</option>
                        <option value="last-month">Last Month</option>
                        <option value="last-year">Last Year</option>
                      </select>
                    </div>
                    
                    <div className="text-right view-report col">
                      <a href="/">View full report →</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className='mb-4 col-sm-12 col-md-12 col-lg-8'>
              <div className="h-100 card card-small">
                <div className="border-bottom card-header">
                  <h6 className="m-0">New Draft</h6>
                </div>
                
                <div className="d-flex flex-column card-body">
                  <form className="quick-post-form">
                    <div className="form-group">
                      <input placeholder="Brave New World" className="form-control"/>
                    </div>
                    
                    <div className="form-group">
                      <textarea placeholder="Words can be like X-rays if you use them properly..." className="form-control"></textarea>
                    </div>
                    
                    <div className="mb-0 form-group">
                      <button type="submit" className="btn btn-accent">
                        Create Draft
                      </button>
                    </div>
                  </form>
                </div>
                
              </div>
            </div>

            <div className='mb-4 col-sm-12 col-md-12 col-lg-8'>
              <div className="blog-comments card card-small">
                
                <div className="border-bottom card-header">
                  <h6 className="m-0">Discussions</h6>
                </div>
                
                <div className="p-0 card-body">
                  <div className="blog-comments__item d-flex p-3">
                    <div className="blog-comments__avatar mr-3">
                      <img src={''} alt="John Doe" />
                    </div>

                    <div className="blog-comments__content">
                      <div className="blog-comments__meta text-mutes">
                        <a className="text-secondary" href="/">John Doe</a> on 
                        <a className="text-secondary" href="/">Hello World!</a>
                        <span className="text-mutes">- 3 days ago</span>
                      </div>
                      <p className="m-0 my-1 mb-2 text-muted">
                        Well, the way they make shows is, they make one show ...
                      </p>
                      <div className="blog-comments__actions">
                        <div className="btn-group-sm btn-group">
                          <button className="btn btn-white">
                            <span className="text-success">
                              <i className="material-icons">check</i>
                            </span>
                             Approve
                          </button>
                          
                          <button className="btn btn-white">
                            <span className="text-danger">
                              <i className="material-icons">clear</i>
                            </span> Reject
                          </button>
                          
                          <button className="btn btn-white">
                            <span className="text-light">
                              <i className="material-icons">more_vert</i>
                            </span> 
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="blog-comments__item d-flex p-3">
                    <div className="blog-comments__avatar mr-3">
                      <img src="" alt="John Doe"/>
                    </div>
                    
                    <div className="blog-comments__content">
                      <div className="blog-comments__meta text-mutes">
                        <a className="text-secondary" href="/">John Doe</a> on 
                        <a className="text-secondary" href="/">Hello World!</a>
                        <span class="text-mutes">- 4 days ago</span>
                      </div>
                      <p className="m-0 my-1 mb-2 text-muted">
                        After the avalanche, it took us a week to climb out. Now...
                      </p>
                      <div className="blog-comments__actions">
                        <div className="btn-group-sm btn-group">
                          <button className="btn btn-white">
                            <span className="text-success">
                              <i className="material-icons">check</i>
                            </span> 
                            Approve
                          </button>
                          <button className="btn btn-white">
                            <span className="text-danger">
                              <i className="material-icons">clear</i>
                            </span>
                            Reject
                          </button>
                          <button className="btn btn-white">
                            <span className="text-light">
                              <i className="material-icons">more_vert</i>
                            </span> 
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="blog-comments__item d-flex p-3">
                    <div className="blog-comments__avatar mr-3">
                      <img src="" alt="John Doe"/>
                    </div>
                    
                    <div className="blog-comments__content">
                      <div className="blog-comments__meta text-mutes">
                        <a className="text-secondary" href="/">John Doe</a> on 
                        <a className="text-secondary" href="/">Hello World!</a>
                        <span className="text-mutes">- 5 days ago</span>
                      </div>
                      <p className="m-0 my-1 mb-2 text-muted">My money's in that office, right? If she start giving me...</p>
                      <div className="blog-comments__actions">
                        <div className="btn-group-sm btn-group">
                          <button className="btn btn-white">
                            <span className="text-success">
                              <i className="material-icons">check</i>
                            </span>
                            Approve
                          </button>
                          
                          <button className="btn btn-white">
                            <span className="text-danger">
                              <i className="material-icons">clear</i>
                            </span> 
                            Reject
                          </button>
                          
                          <button className="btn btn-white">
                            <span className="text-light">
                              <i className="material-icons">more_vert</i>
                            </span> 
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-top card-footer">
                  <div className="row">
                    <div className="text-center view-report col">
                      <button type="submit" className="btn btn-white">View All Comments</button>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
            
            <div className='mb-4 col-sm-12 col-md-12 col-lg-8'>
              <div className="card card-small">
                <div className="border-bottom card-header">
                  <h6 className="m-0">Top Referrals</h6>
                  <div className="block-handle"></div>
                </div>
                
                <div className="p-0 card-body">
                  <ul className="list-group-small list-group list-group-sm list-group-flush">
                    <li className="d-flex px-3 list-group-item">
                      <span className="text-semibold text-fiord-blue">GitHub</span>
                      <span className="ml-auto text-right text-semibold text-reagent-gray">19,291</span>
                    </li>
                    
                    <li className="d-flex px-3 list-group-item">
                      <span className="text-semibold text-fiord-blue">Stack Overflow</span>
                      <span className="ml-auto text-right text-semibold text-reagent-gray">11,201</span>
                    </li>
                    
                    <li className="d-flex px-3 list-group-item">
                      <span className="text-semibold text-fiord-blue">Hacker News</span>
                      <span className="ml-auto text-right text-semibold text-reagent-gray">9,291</span>
                    </li>
                    
                    <li className="d-flex px-3 list-group-item">
                      <span className="text-semibold text-fiord-blue">Reddit</span>
                      <span className="ml-auto text-right text-semibold text-reagent-gray">8,281</span>
                    </li>
                    
                    <li className="d-flex px-3 list-group-item">
                      <span className="text-semibold text-fiord-blue">The Next Web</span>
                      <span className="ml-auto text-right text-semibold text-reagent-gray">7,128</span>
                    </li>
                    
                    <li className="d-flex px-3 list-group-item">
                      <span className="text-semibold text-fiord-blue">Tech Crunch</span>
                      <span className="ml-auto text-right text-semibold text-reagent-gray">6,218</span>
                    </li>
                    
                    <li className="d-flex px-3 list-group-item">
                      <span className="text-semibold text-fiord-blue">YouTube</span>
                      <span className="ml-auto text-right text-semibold text-reagent-gray">1,218</span>
                    </li>
                    
                    <li className="d-flex px-3 list-group-item">
                      <span className="text-semibold text-fiord-blue">Adobe</span>
                      <span className="ml-auto text-right text-semibold text-reagent-gray">1,171</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-top card-footer">
                  <div className="row">
                    <div className="col">
                      <select className="form-control custom-select form-control-sm custom-select-sm" style={{maxWidth: "130px"}}>
                        <option value="last-week">Last Week</option>
                        <option value="today">Today</option>
                        <option value="last-month">Last Month</option>
                        <option value="last-year">Last Year</option>
                      </select>
                    </div>
                    <div className="text-right view-report col">
                      <a href="/">Full report →</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>
    </div>
  )
}

export default Home