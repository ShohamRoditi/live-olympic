import React, { Component } from 'react';
import { MdEdit, MdSave } from "react-icons/md";

class Competitor extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      editing: false 
    }

    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.renderUI = this.renderUI.bind(this)
  }

  edit() {
    this.setState({ editing: true }) 
  }

 
  save(event) {
    event.preventDefault() // to prevent the default behaviour/ functionality
    console.log("print");
    // console.log(this.newCompetitor.value, this.props.index)
    // this.props.onChange(this.newCompetitor.value, this.props.index);
    console.log( this.id.value, this.score.value, this.time.value);
    this.props.onChange( this.id.value, this.score.value, this.time.value);
    this.setState({ editing: false }) 
  }

  renderForm(props) {
    return (
      <div>
        {/* <form>
          <textarea ref={input => this.newCompetitor = input} cols="30" rows="10" />
          <span>
            <button onClick={this.save}><MdSave /></button>
          </span>
        </form> */}

          <form onSubmit = {this.save}>
            <h6>Please Enter The Following:</h6>
            <label className = "updateLabel">
                Id:
                <input required type = "text" name = "id" ref= {input => this.id = input} cols="30" rows="10"/>
            </label>

            <label className = "updateLabel"> 
                Score:
                <input required type = "text" name = "score" ref= {input => this.score = input}/>
            </label>
                    
            <label className = "updateLabel">
                Time: 
                <input required type = "text" name = "time" ref= {input => this.time = input}/>
            </label>
            <button type = "submit" className = "btn btn-primary card-button"><MdEdit/></button>
            <button onClick={this.save} className = "btn btn-primary card-button"><MdSave /></button>
          </form>
      </div>
    )
  }

  renderUI(props) {
    return (
      <div className="competitor">
        <div>{this.props.children}</div>
        <span>
          <button 
            onClick={this.edit} 
            className="btn btn-primary" 
            style={{marginRight: '7px'}}
          > 
            <MdEdit />
          </button>
        </span>
      </div>
    );
  }

  render() {
    return this.state.editing ? this.renderForm() : this.renderUI()
  }
}

export default Competitor;
