import React from 'react'
import {Route} from 'react-router-dom'
// import IdeasList from '../Components/CompetitorList'
import MyIdeas from '../Components/MyIdeas'
import Header from '../Header'
import CompetitorList from '../Components/CompetitorList';


const ReactRouter = () => {
    return (
        <React.Fragment>
            <Header/>
            <Route exact path= "/" component= {CompetitorList}/>
            {/* <Route path="/cruise/:id" component={CompetitorList}/> */}
            {/* <Route path="/getCruiseByYearCompetitor" component={MyIdeas}/> */}

        </React.Fragment>
    )
}

export default ReactRouter