<h4 align="center">
  This repo provides an implementation of a Punch Timesheet managament API.
</h4>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/joao96/desafio-ilia?style=flat-square">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/joao96/desafio-ilia?style=flat-square">
  <img alt="License" src="https://img.shields.io/github/license/joao96/desafio-ilia?style=flat-square">
</p>

<p align="center">
  <a href="#checkered_flag-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-setup-with-docker">Setup with Docker</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#test_tube-testing">Testing</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#page_facing_up-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#get-in-touch-monocle_face">Get in touch</a>
</p>


## :checkered_flag: Technologies

- [Typescript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/en/)
- [Nestjs](https://nestjs.com/)
- [Postgres - Official Image | Docker Hub](https://hub.docker.com/_/postgres)
- [Prisma](https://www.prisma.io/)
- [Swagger](https://swagger.io/specification/)
- [Dayjs](https://day.js.org/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [Sentry](https://sentry.io/welcome/)

- [VS Code][vc] with [EditorConfig][vceditconfig] and [ESLint][vceslint]

## :information_source: Setup with Docker

In order to run this application with Docker, it's required that you have [Git], [Docker] and [Node.js v16.x][nodejs] or higher on your computer. 

From your command line:

**Step 1:** 

Clone this repo & run a `cd` into the project's folder.

**Step 2:** 

Run the command that will create a Docker Image of the project and start the container:

```bash
$ docker-compose up
```

**Step 3:** 

Once you get the container running, open the project folder on a different terminal window and execute the following command in order to apply the necessary migrations:

```bash
$ npx prisma migrate dev
```

That's it! 
Now you should be able to access the Swagger page through http://localhost:3000/api and test it out.

--------

## :test_tube: Testing

In order to execute the test suite, run the command below:

```bash
$ npm run test
```

## :page_facing_up: License

Nest is [MIT licensed](LICENSE).


## Get in touch! :monocle_face:

[![Linkedin Badge](https://img.shields.io/badge/-João%20Victor%20Poletti-0e76a8?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jvpoletti/)](https://www.linkedin.com/in/jvpoletti/)
[![Gmail Badge](https://img.shields.io/badge/-jvpoletti@gmail.com-ff512f?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jvpoletti@gmail.com)](mailto:jvpoletti@gmail.com)

<br />

Made with :green_heart: by [João Victor Poletti](https://github.com/joao96).

[nodejs]: https://nodejs.org/
[Git]: https://git-scm.com/
[Docker]: https://www.docker.com/
[npm]: https://www.npmjs.com/
[vc]: https://code.visualstudio.com/
[vceditconfig]: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
[vceslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
