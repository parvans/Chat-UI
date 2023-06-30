import moment from 'moment/moment'
import React from 'react'
import {Image} from 'cloudinary-react'

export default function BlogCard(props) {
    const { title, image, author, date ,id,setBlog} = props
    return (
        <div className="card card-blog">

            <div className="card-header card-header-image">
                <div className="author">
                    <div className='row' style={{ display: "flex",padding:"0px 10px" }}>
                    <img
                      alt="auther"
                      className="avatar border-gray mt-2 border ml-2"
                      src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                    />
                        
                       
                        <div className='col-10' style={{ flexWrap: "wrap",height:"30%" }}>
                            <span>
                                <a href="#pablo" onClick={e => e.preventDefault()} style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                                {author} 
                                     
                                </a>

                                {/* <p className="text-muted" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                                    {author}
                                </p> */}

                                <p className="text-muted" style={{ fontSize: "0.7rem" }}>
                                    {moment.utc(date).fromNow()} 
                                </p>

                            </span>
                        </div>
                    </div>
                </div>
                <div className="colored-shadow">

                {image &&<Image cloudName="dgupyenrw" publicId={image} style={{ height: "300px", width: "100%" }} />}
                </div>
                <div className="card-body" >
                    <h4 className="card-title">
                        <a 
                        onClick={()=>{
                            setBlog(true)
                            localStorage.setItem("blogId",id)
                        }}
                        href='#blog'
                        >
                            {title}
                        </a>
                    </h4>
                    
                </div>
                
            </div>



        </div>
    )
}

// moment.utc(date).utcOffset("+05:30").format("DD MMM YYYY") output: 12 Dec 2019
//moment.utc(date).fromNow() output: 2 months ago

{/* <div className="stats ml-auto">
    <h6 className="text-muted" style={{ fontSize: "0.8rem"}}>
        <i className="fa fa-circle text-primary" /> Opened{" "}
        <i className="fa fa-circle text-warning" /> Read{" "}
        <i className="fa fa-circle text-danger" /> Deleted{" "}
        <i className="fa fa-circle text-gray" /> Unopened
    </h6>
</div> */}
