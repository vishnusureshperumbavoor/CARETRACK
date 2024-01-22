import React, { Component } from 'react';
import axios from 'axios';

export default class FileUploadComponent extends Component {

 constructor(props) {
   super(props);

   this.onFileChange = this.onFileChange.bind(this);
   this.onSubmit = this.onSubmit.bind(this);

   this.state = {
       file: ''
   }
 }

 onFileChange(e) {
     this.setState({ file: e.target.files[0] })
 }

 onSubmit(e) {
     e.preventDefault();
     const formData = new FormData();
     formData.append('file', this.state.file);
     axios.post("http://localhost:5000/api/user-profile", formData, {}).then(res => {
         console.log(res);
     });
 }

 render() {
   return (
     <div className="container">
       <h3>Patient Data</h3>
       <hr/>
       <form onSubmit={this.onSubmit}>
           <div className="form-group">
               <input type="file" onChange={this.onFileChange} />
           </div>
           <div className="form-group">
               <button className="btn btn-primary" type="submit">Upload</button>
           </div>
       </form>
     </div>
   );
 }
}
