Work in progress. including the readme

# CYBERWARFARE4K

_.. now in React!_

- [Setups and execution of the project](#setups-and-execution-of-the-project)
- [Directory structure](#directory-structure)

## Introduction

**What is it?**
Cyberwarfare4k is a multiplayer .....

**What is it not?**
Cyberwarfare4k is not a .....

## Technologies

**M**ongoDB
**E**xpress
**R**eact and
**N**ode

## Contributing

Feel free to contribute to this repository.
Issues, feedback etc. can be sent to:
tormod.flesjo[at]gmail

## Acknowledgments

This wouldn't be possible without my teachers, [Maxence](https://github.com/mc100s) and [Lukas](https://github.com/gisderdube).
[Markus](https://github.com/fenrew) for basicaly writing all of the original code and [Haakon](https://www.linkedin.com/in/haakon-foyen/) for his authentication skills!

# Setups and execution of the project

(replace `<my-project>` and `<https://github.com/user/my-project.git>` by what you want, without `<` and `>`).

```sh
# Clone the project with only the last commit and save it in the folder <my-project>
$ git clone --depth=1 https://github.com/Ojself/cyberwarefare4k.git <my-project>

$ cd <my-project>
$ rm -rf .git
$ git init

# Set your GitHub repository as the "origin" remote repository
$ git remote add origin <https://github.com/user/my-project.git>
```

### Files to add

You should have a `server/.env` file, with for example the following values:

```
PORT=5000
SESSION_SECRET=anyValue
MONGODB_URI=......
CLOUDINARY_CLOUD_NAME=......
CLOUDINARY_API_KEY=......
CLOUDINARY_API_SECRET=......
```

**To install all the packages**

```sh
# Install server and client packages + build the React applicatin
$ npm install

# OR you can install manually the server and client packages
$ (cd server && npm install)
$ (cd client && npm install)
```

**To install a package for the server**

```sh
$ cd server
$ npm install axios
```

**To install a package for the client**

```sh
$ cd client
$ npm install axios
```

**To run the server and the client**

```sh
# Open a first terminal
$ npm run dev:server
# Run the server on http://localhost:5000/

# Open a second terminal
$ npm run dev:client
# Run the client on http://localhost:3000/
```

So now you can go to

- http://localhost:5000/api/: A simple API call
- http://localhost:5000/: The website based on client/build (that you can update with `$ (cd client && npm run build)`)
- http://localhost:3000/: The last version of your React application that is calling your API with the base url "http://localhost:5000/api/"

## Directory structure

```
.vscode/
client/
    build/
    public/
    src/
        components/
            pages/
    package.json
server/
    bin/
    configs/
    models/
    passport/
    routes/
    app.js
    middlewaresAuth.js
    package.json
.gitignore
package.json
README.md
```
