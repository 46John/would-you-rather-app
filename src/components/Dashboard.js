import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
    state = {
        questionView : 'answered'
    }
    handleViewChange = (questionView) => {
        this.setState({
            questionView
        })
    }
    render() {
        console.log("dashboard props", this.props);
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-between align-items-start">
                            <h1 className="page-title">{ this.state.questionView === 'answered' ? "Answered Questions" : "Unanswered Questions"}</h1>
                            <div className="answer-filter">
                                <button className={ this.state.questionView === 'answered' ? "btn btn-secondary" : "btn btn-secondary active"} onClick={() => this.handleViewChange('answered')}>Answered</button>
                                <button className={ this.state.questionView === 'unanswered' ? "btn btn-secondary" : "btn btn-secondary active"} onClick={() => this.handleViewChange('unanswered')}>Unanswered</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {this.state.questionView === 'answered' &&(
                        this.props.answeredQuestions.map((id, index) => (
                            <Question id={id} key={index} showResults={false} />
                        )))}
                        {this.state.questionView === 'unanswered' &&(
                            this.props.unansweredQuestions.map((id, index) => (
                                <Question id={id} key={index} showResults={false} />
                            )))}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, questions, users }) {
    const answeredQuestions = [];
    const unansweredQuestions = [];
    const questionids = Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
    for(let id of questionids){
        if(users[authedUser].answers[id]){
            answeredQuestions.push(id);
        }else{
            unansweredQuestions.push(id);
        }
    }
    return {
        questionids,
        answeredQuestions,
        unansweredQuestions
    }
}

export default connect(mapStateToProps)(Dashboard);