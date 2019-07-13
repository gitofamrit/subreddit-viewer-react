import React from "react";

export default class NewsCard extends React.Component {
  render() {
    return (
      <div className="card-wrapper">
        <div onClick={this.props.postOpen} className="card">
          {this.props.title}
        </div>
        <div className="footer">
          <img src="upvote.png" className="upvote-img" alt="upvote" />
          {this.props.upvotes}
        </div>
      </div>
    );
  }
}
