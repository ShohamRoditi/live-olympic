import React, { Component } from 'react'
import Competitor from './Competitor'


class CompetitorList extends Component {
  constructor(props) {
    super(props);
    this.state = { olympicCompetitors: [] }

    this.eachCompetitor = this.eachCompetitor.bind(this)
    this.update = this.update.bind(this)
    this.add = this.add.bind(this)
    this.nextID = this.nextID.bind(this)

  }

  componentDidMount() { 
    console.log("did mount");
    const url = 'https://olympic-live-game.herokuapp.com/cruises'; 
    fetch(url)
      .then(res => res.json())
        .then(data => {
            data.map(competitor => {
              this.add({competitorDetail: competitor.competitorDetail, 
                id: competitor.userId, competitor: competitor.competitor, 
                score: competitor.score, date: competitor.date, time:competitor.time});
               return 0;
           });
        });
   }

  update(id, score, time) {
    console.log("update");
    let paramsInBody = [`score=${score}&time=${time}`];
    console.log(paramsInBody);
    console.log("id " + id);
    const url = 'https://olympic-live-game.herokuapp.com/cruise/' + id;
    fetch(url,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',

      },
      body:paramsInBody
    }).then( result => result.json())
      .then(json => {
        console.log("checking")
        console.log(JSON.stringify(json));
        console.log(json.nModified);
        if(json.nModified === 1){
          this.setState(prevState => ({
          olympicCompetitors: prevState.olympicCompetitors.map(data => data.id !== id ? data : { ...data, time: time,score: score })
        }))
        }
        else{
          alert(`No update was made.\nReason: Nothing was changed.`);
        }
      
      })
      .catch(err => console.log(err));
  
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

  // default values + Array.reduce
  nextID(olympicCompetitors = []) {
    let max = olympicCompetitors.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id , 0)
    return ++max;
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
            {/* { console.log(item) } */}
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

  render() {
    return (
      <div className="CompetitorList">
        { this.state.olympicCompetitors.map(this.eachCompetitor) }
      </div>
    );
  }
}

export default CompetitorList;
