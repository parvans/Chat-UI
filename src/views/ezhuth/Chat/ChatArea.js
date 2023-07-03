import ChatBox from 'components/miscellaneous/ChatBox'
import MyChats from 'components/miscellaneous/MyChats'
import SideDrawer from 'components/miscellaneous/SideDrawer'
import { ChatState } from 'context/ChatProvider'
import React from 'react'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import { Line,Pie } from 'react-chartjs-2'
import { dashboard24HoursPerformanceChart } from 'variables/charts'
import { dashboardEmailStatisticsChart } from 'variables/charts'
import { dashboardNASDAQChart } from 'variables/charts'
export default function ChatArea() {
    const {user}=ChatState()
    const [fetchAgain,setFetchAgain]=React.useState(false)
  return (
    <>
    <DemoNavbar/>
    <div className="content" style={{marginTop:"70px"}}>
        <div style={{width:"100%"}}>
            {user&& <SideDrawer/>}
              <Row style={{display:"flex",justifyContent:"center",width:"100%",height:"91.5vh",padding:"10px",marginLeft:"0px"}}>
                {user&& <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                {user&& <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
              </Row>
           
        </div>
    </div>




          {/* <div className="content" style={{marginTop:"70px"}}>
       
        <Row>
          <Col md="4">
            <Card style={{backgroundColor:"#dee0df"}}>
              <CardHeader>
                <CardTitle tag="h5">Email Statistics</CardTitle>
                <p className="card-category">Last Campaign Performance</p>
              </CardHeader>
              <CardBody style={{ height: "100%" }}>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                  <i className="fa fa-circle text-gray" /> Unopened
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div>
                
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart" style={{backgroundColor:"#dee0df"}}>
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div> */}

    </>
  )
}
