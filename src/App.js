import React, { useState, useEffect } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Card, Icon, Image } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
function App() {
  const [avatar, setAvatar] = useState("");
  const [userName, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");
  const [repos, setRepos] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://api.github.com/users/jzboyd")
    .then((res) => res.json())
    .then(data => {
      // console.log(data)
      setData(data);
    })
  }, []);

  const setData = ({name, login, followers, following, public_repos, avatar_url}) => {
    setName(name)
    setUsername(login)
    setFollowers(followers)
    setFollowing(following)
    setRepos(public_repos)
    setAvatar(avatar_url)
  }


  const handleSearch = (e) => {
    setUserInput(e.target.value);

  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/evanepperson`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setData(data)
    })

  }



  return (
    <>
      <div className="navbar">Github Search</div>
      <div className="search">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            name='name'
            placeholder="Search Github"
            onChange={handleSearch}
          />
          <button className="button" onClick={handleSubmit}>
            Search
          </button>
        </form>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Name"
              name="name"
              onChange={handleSearch}
            />
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
        <Card>
          <Image src={avatar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Description>{userName}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {followers} Followers
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {repos} Repos
            </a>
          </Card.Content>
        </Card>
      </div>
    </>
  );
}
export default App;
