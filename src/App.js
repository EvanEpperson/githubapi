// import React, { useState, useEffect } from "react";
// import "./App.css";
// import "semantic-ui-css/semantic.min.css";
// import { Card, Icon, Image } from "semantic-ui-react";
// import { Form } from "semantic-ui-react";
// function App() {
//   const [avatar, setAvatar] = useState("");
//   const [userName, setUsername] = useState("");
//   const [followers, setFollowers] = useState("");
//   const [following, setFollowing] = useState("");
//   const [languages, setLanguage] = useState("");
//   const [name, setName] = useState("");
//   const [repos, setRepos] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const [description, setDescription] = useState("");
//   const [url, setUrl] = useState("");
//   const [stars, setStars] = useState("");
//   const [repoName, setRepoName] = useState('');
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     fetch("https://api.github.com/users/jzboyd")
//     .then((res) => res.json())
//     .then(data => {
//       // console.log(data)
//       setData(data);
//     })
//   }, []);

//   const setData = ({name, login, followers, following, public_repos, avatar_url}) => {
//     setName(name)
//     setUsername(login)
//     setFollowers(followers)
//     setFollowing(following)
//     setRepos(public_repos)
//     setAvatar(avatar_url)
//   }

//   const setDatatesting = ({ description, url, stargazers_count, language, name }) => {
//     setDescription(description)
//     setUrl(url)
//     setStars(stargazers_count)
//     setLanguage(language)
//     setRepoName(name)
//   };


//   const handleSearch = (e) => {
//     e.preventDefault()
//     setUserInput(e.target.value);

//   };



//     const handleSubmittesting = () => {
//       fetch(`https://api.github.com/users/${userInput}/repos`)
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           setDatatesting(data[1]);
//         });
//     };

//       const handleSubmit = () => {
//         fetch(`https://api.github.com/users/${userInput}`)
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data);
//             setData(data);
//             handleSubmittesting();
//           });
//       };

//       // const renderRepo = (repo) => {
//       //   return(
//       //     <div key={repo.id}>
//       //       <h2>
//       //         {repo.name}
//       //       </h2>
//       //     </div>
//       //   )

//       // }



//   return (
//     <>
//     <button onClick={handleSubmittesting}>testing</button>
//     <div id='anyid'> description <span>{description}</span></div>

//     <div> how many stars you have <span>{stars}</span></div>
//     <div>languages <span>{languages}</span></div>
//     <div>repo Name <span>{repoName}</span></div>
//     {/* <div>
//       {repos.map(renderRepo)}
//     </div> */}
//       <div className="search">
//         <Form onSubmit={handleSubmit}>
//           <Form.Group>
//             <Form.Input
//               placeholder="Name"
//               name="name"
//               onChange={handleSearch}
//             />
//             <Form.Button content="Submit" />
//           </Form.Group>
//         </Form>
//         <Card>
//           <Image src={avatar} wrapped ui={false} />
//           <Card.Content>
//             <Card.Header>{name}</Card.Header>
//             <Card.Description>{userName}</Card.Description>
//           </Card.Content>
//           <Card.Content extra>
//             <a>
//               <Icon name="user" />
//               {followers} Followers
//             </a>
//           </Card.Content>
//           <Card.Content extra>
//             <a>
//               <Icon name="user" />
//               {repos} Repos
//             </a>
//           </Card.Content>
//         </Card>
//       </div>
//     </>
//   );
// }
// export default App;

import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import RepoDetails from "./Details";
import Profile from "./Profilepage";
import { render } from "@testing-library/react";
function App() {
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState("");
  const [language, setLanguage] = useState("");
  const [name, setName] = useState("");
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [details, setDetails] = useState({});
  useEffect(() => {
    setRepos([]);
    setDetails({});
  }, [username]);
  const handleSubmit = (e) => {
    e.preventDefault();
    searchRepos();
    document.querySelector("#asc").style.display = "block";
    document.querySelector("#dsc").style.display = "none";
  };
  const searchRepos = () => {
    axios({
      method: "get",
      url: `https://api.github.com/users/${username}/repos`,
    }).then((res) => {
      setRepos(res.data);
      // testing()
    });
  };
  const renderRepo = (repo) => {
    return (
      <div className="row" onClick={() => getDetails(repo.name)} key={repo.id}>
        <h2 className="repo-name">{repo.name}</h2>
      </div>
    );
  };
  const getDetails = (repoName) => {
    axios({
      method: "get",
      url: `https://api.github.com/repos/${username}/${repoName}`,
    }).then((res) => {
      setDetails(res.data);
    });
  };


  const testing = () => {
    return (
            repos
        .sort((a, b) => {
          if (a.stargazers_count > b.stargazers_count) return -1;
          else if (a.stargazers_count < b.stargazers_count) return 1;
          return 0;
        })
        .map(renderRepo)
    )

  }

  const testingdesc = () => {
        return repos
          .sort((a, b) => {
            if (a.stargazers_count > b.stargazers_count) return 1;
            else if (a.stargazers_count < b.stargazers_count) return -1;
            return 0;
          })
          .map(renderRepo);
  }

  const asc = (e) => {    
    e.preventDefault();
    searchRepos();
    document.querySelector("#asc").style.display = "none";
    document.querySelector("#dsc").style.display = "block";
  }


  return (
    <>
      <div className="navbar">Github Search</div>
      <div className="container">
        <form className="form">
          <input
            className="input"
            value={username}
            placeholder="Search Github"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="button" onClick={handleSubmit}>
            Search
          </button>
          <button onClick={asc}>
            asc
          </button>
        </form>
        <div id="asc" className="results-container">
          {testing()}
        </div>
        <div id="dsc" className="results-container">
          {testingdesc()}
        </div>
        <RepoDetails details={details} />
      </div>
      <Profile />
    </>
  );
}
export default App;






