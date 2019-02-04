import React, { Component } from 'react';
import {MdSearch} from 'react-icons/md';
import Competitor from './Competitor';

class SearchByYear extends Component {
    constructor(props){
        super(props);
        this.add               = this.add.bind(this);
        this.renderForm        = this.renderForm.bind(this);
        this.nextID            = this.nextID.bind(this);
        this.getCompetitors    = this.getCompetitors.bind(this);
        this.handleYearChange  = this.handleYearChange.bind(this);
        this.handleNameChange  = this.handleNameChange.bind(this);
        this.state             = {
            year: null,
            competitor: null,
            olympicCompetitors : [] }
    }

    getCompetitors(e){
        e.preventDefault();
        var self = this;
        let paramsInBody = [`year=${self.state.year}&competitor=${self.state.competitor}`];
        console.log(self.state.year)
        console.log(self.state.competitor)
        console.log(paramsInBody)
        const url = `https://olympic-live-game.herokuapp.com/getCruiseByYearCompetitor`;
        self.setState({olympicCompetitors: []});

        fetch(url,{
            method:'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
      
            },
            body:paramsInBody
        }).then(res => res.json())
                .then(json => {
                        json.map(competitor => {
                            this.add({competitorDetail: competitor.competitorDetail, 
                              id: competitor.userId, competitor: competitor.competitor, 
                              score: competitor.score, date: competitor.date, time:competitor.time});
                             return 0;
                        
                        });
                })
            
    }

    renderForm(){
        const self = this;
        return(
            <div className = "searchForm">
                <form onSubmit = {self.getCompetitors}>
                    <h6>Please Enter The Following:</h6>
                    <label className = "SearchLabel">
                        Year:
                        <input required type = "text" name = "year" onChange = {self.handleYearChange}/>
                    </label>

                    <label className = "SearchLabel">
                        Name:
                        <input required type = "text" name = "Name" onChange = {self.handleNameChange}/>
                    </label>

                    <button type = "submit" className = "btn btn-primary card-button"><MdSearch/></button>
                </form>
                {self.state.olympicCompetitors.map(self.eachCompetitor)}
            </div>
        )
    }

    eachCompetitor(item, i) {
        return (
          <div
            key={ `competitor${item.id}` }
            className="card"
            style={ { width: '18rem', marginBottom: '7px' } }
          >
            <div className="card-body">
              <Competitor
                // NOTE: No need this key here! read more: https://reactjs.org/docs/lists-and-keys.html#keys 
                key={ `competitor${item.id}` } 
                index={ item.id }
                onChange={ this.update }
              >
                { console.log("id" + item.id) }
                <h5 className="card-title">{ item.competitor }</h5>
                <p className="card-text">id: { item.id }</p>
                <p className="card-text">score: { item.score }</p>
                <p className="card-text">date: { item.date }</p>
                <p className="card-text">time: { item.time }</p>
                <p className="card-text">Competitors:</p>
                <p className="card-text">country: {item.competitorDetail.country}</p>
                <p className="card-text">birth: {item.competitorDetail.birth}</p>
              </Competitor>
            </div>
          </div>
        );
      }
    

    // destructor + default values
  add({ event = null, id = null, competitorDetail = [{'country': 'default country', 'birdth': 'default birdth'}] , competitor = 'default competitor', score = 0 , date = 'default date', time = 'default time'}) {
    console.log(event, id, competitorDetail, competitor, score, date, time)
     this.setState(prevState => ({
       olympicCompetitors: [
         ...prevState.olympicCompetitors, {
           id: id !== null ? id : this.nextID(prevState.olympicCompetitors),
           competitorDetail: competitorDetail, 
           competitor: competitor,
           score: score,
           date: date,
           time: time
         }]
     }))
   }

    nextID(Competitor = []){
        let max = Competitor.reduce((prev, curr) => prev.id > curr.id ? prev.id :  curr.id, 0);
        return ++max;
    }

    
    handleYearChange(e){
        this.setState({
            year: e.target.value
        })
    }

    handleNameChange(e){
        this.setState({
            competitor: e.target.value
        })
    }
    
    
    render(){
        return this.renderForm();
    }

}

export default SearchByYear;