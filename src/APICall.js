import React from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

// https://www.reddit.com/r/space.json

export default class APICall extends React.Component {
  // componentWillMount() {
  //   this.getReddit();
  // }
  constructor(props) {
    super(props);
    this.getReddit = this.getReddit.bind(this);
    this.state = {
      posts: [],
      subreddit: ""
    };
    this.searchReddit = this.searchReddit.bind(this);
    this.postOpen = this.postOpen.bind(this);
  }
  getReddit() {
    axios
      .get(`https://www.reddit.com/r/${this.state.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(d => d.data);
        this.setState({
          posts
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          posts: []
        });
      });
  }
  postOpen(url) {
    window.open(url);
  }
  searchReddit(event) {
    if (event.key === "Enter") {
      var subreddit = this.refs.subreddit.value;
      this.setState(
        {
          subreddit
        },
        this.getReddit
      );
    }
  }
  render() {
    var inputComp = (
      <div>
        <input
          type="text"
          ref="subreddit"
          onKeyDown={this.searchReddit}
          className="search-box"
          placeholder="Search Reddit"
          autoFocus
        />
      </div>
    );
    var cards = [],
      title;

    if (this.state.subreddit === "" && this.state.posts.length === 0) {
      title = "Welcome to Subreddit search!";
      cards = [];
    } else if (this.state.subreddit !== "" && this.state.posts.length === 0) {
      cards = [];
      title = `/r/${this.state.subreddit}`;
      cards = <h1>Sorry, no posts found.</h1>;
    } else {
      title = `/r/${this.state.subreddit}`;
      cards = [];
      this.state.posts.forEach((post, ind) =>
        cards.push(
          <NewsCard
            postOpen={() => this.postOpen(post.url)}
            key={ind}
            upvotes={post.ups}
            title={post.title}
          />
        )
      );
    }
    return (
      <div>
        <div className="App-header">
          <div id="page-title">Reddit Searcher</div>
          {inputComp}
          <h1>{title}</h1>
        </div>
        {cards}
      </div>
    );
  }
}
