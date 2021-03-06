import React, { useState, useEffect } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Card, Icon, Image } from "semantic-ui-react";
import { Form } from "semantic-ui-react";
function Profile() {
  const [avatar, setAvatar] = useState("");
  const [userName, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [languages, setLanguage] = useState("");
  const [name, setName] = useState("");
  const [repos, setRepos] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [stars, setStars] = useState("");
  const [repoName, setRepoName] = useState('');
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

  const setDatatesting = ({ description, url, stargazers_count, language, name }) => {
    setDescription(description)
    setUrl(url)
    setStars(stargazers_count)
    setLanguage(language)
    setRepoName(name)
  };

  const handleSearch = (e) => {
    e.preventDefault()
    setUserInput(e.target.value);

  };

    const handleSubmittesting = () => {
      fetch(`https://api.github.com/users/${userInput}/repos`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDatatesting(data[1]);
        });
    };

      const handleSubmit = () => {
        fetch(`https://api.github.com/users/${userInput}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setData(data);
            handleSubmittesting();
          });
      };

      // const renderRepo = (repo) => {
      //   return(
      //     <div key={repo.id}>
      //       <h2>
      //         {repo.name}
      //       </h2>
      //     </div>
      //   )

      // }

  return (
    <>
    <button onClick={handleSubmittesting}>testing</button>
    <div id='anyid'> description <span>{description}</span></div>

    <div> how many stars you have <span>{stars}</span></div>
    <div>languages <span>{languages}</span></div>
    <div>repo Name <span>{repoName}</span></div>
    {/* <div>
      {repos.map(renderRepo)}
    </div> */}
      <div className="search">
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
export default Profile;
