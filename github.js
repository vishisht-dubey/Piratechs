// Github State
export class User {
    constructor(name,url,bio,projects,blog,avatar,login,repoNum,repoLink,starred,followers,following) {
        this.name = name;
        this.url = url;
        this.bio = bio;
        this.projects = projects;
        this.blog = blog;
        this.avatar = avatar;
        this.login = login;
        this.repoNum = repoNum;
        this.repoLink = repoLink;
        this.starred = starred;
        this.followers = followers;
        this.following = following;
    }
  
    logInfo() {
        Object.values(this).map(value => {
            console.log(value);
        })
    }
  }
  
export class Repository {
    constructor(name,url,date,owner,topics,license,updated,deployment,language,homepage,description) {
        this.name = name;
        this.url = url;
        this.date = date;
        this.owner = owner;
        this.updated = updated;
        this.deployment = deployment;
        this.license = license;
        this.topics = topics;
        this.language = language;
        this.homepage = homepage;
        this.description = description;
    }

    logInfo() {
        Object.values(this).map(value => {
            console.log(value);
        })
    }
}
  
  export const fetchGithub = async (username) => {
    if (!username) username = `strawhat19`;
    const githubURL = `https://api.github.com/users/${username}`;
    const repoURL = `https://api.github.com/users/${username}/repos`;
    const repoResponse = await fetch(repoURL);
    const userResponse = await fetch(githubURL);
    const repositories = await repoResponse.json();
    const user = await userResponse.json();
    const {name,html_url,bio,blog,avatar_url,login,public_repos,repos_url,starred_url,followers,following} = user;
    const customRepos = repositories.map(repo => new Repository(repo.name,repo.html_url,repo.created_at,repo.owner,repo.topics,repo.license,repo.updated_at,repo.deployments_url,repo.language,repo.homepage,repo.description));
    return {user,repositories,public: new User(name,html_url,bio,customRepos,blog,avatar_url,login,public_repos,repos_url,starred_url,followers,following)};
};