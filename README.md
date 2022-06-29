# AlgoCrowd
AlgoCrowd is a decentralized crowdfunding platform on Algorand. The demo app is online at: 
- https://main--effulgent-marshmallow-2fa690.netlify.app

## Contents
- [Algorand Crowdfunding Demo](#algorand-crowdfunding-demo)
  - [Usage](#usage)
  - [Development Setup](#development-setup)
- [Client](#client)
  - [Client Application Routes](#client-application-routes)
- [Server](#server)
  - [Server Endpoints](#server-endpoints)
- [Database](#database)
  - [Database Tables](#database-tables)

## Algorand Crowdfunding Demo

This demo is an on-chain crowdfunding using smart contracts on the Algorand blockchain.

### Usage

The file `crowdfunding-demo/crowdfunding/operations.py` provides a set of functions that can be used to create and interact
with crowdfunding. See that file for documentation.

### Development Setup

This repo requires Python 3.6 or higher. We recommend you use a Python virtual environment to install
the required dependencies.

Set up venv (one time):
 * `python3 -m venv venv`

Active venv:
 * `. venv/bin/activate` (if your shell is bash/zsh)
 * `. venv/bin/activate.fish` (if your shell is fish)

Install dependencies:
* `pip install -r requirements.txt`

Run tests:
* First, start an instance of [sandbox](https://github.com/algorand/sandbox) (requires Docker): `./sandbox up nightly`
* `pytest operations_test.py`
* When finished, the sandbox can be stopped with `./sandbox down`

Format code:
* `black .`

## Overall Architechture
![](./img/architecture.jpg)

## Client

### Client Application Routes

- Route `/`: contains the initial page of the app, it shows all the active projects.
- Route `/create-project`: contains the form that allows the user to create a new project.
- Route `/user-ares` : contains all the projects created and funded from the user.
- Route `/${appId}` : contains the project with the specified appId. From here the user can fund it.

## Server

### Server Endpoints

- POST `/api/applications/create`
  - request parameters: none
  - request body content: all the parameters requested to store an application
  ```json
  {
      "appId":"96246912",
      "creatorAddress":"R3Z6A6BUXWRYZ3IFBSK7Y54EBN6FRBSYGS4GNTNE2DB5GXJAC64JOMNFNI",
      "description":"ProjectDescription",
      "imageUrl":"www.test.com/imageUrl",
      "start":"1655907720000.0",
      "end":"1656080520000.0",
      "goal":"1"
  }
  ```
  - response body: none

  ---

- POST `/api/applications/fund`
  - request parameters: none
  - request body content: all the parameters requested to store an application fund action
  ```json
    {
        "funderAddress":"R3Z6A6BUXWRYZ3IFBSK7Y54EBN6FRBSYGS4GNTNE2DB5GXJAC64JOMNFNI",
        "appId":"96246912",
        "amount":"2"
    }
  ```
  - response body: none

  ---

- GET `/api/applications`
  - request parameters: none 
  - response body content: all the project created
  ```json
    [
      {
          "appId": "96246912",
          "creatorAddress": "R3Z6A6BUXWRYZ3IFBSK7Y54EBN6FRBSYGS4GNTNE2DB5GXJAC64JOMNFNI",
          "name": "test",
          "description": "test",
          "imageUrl": "test",
          "start": "1655907720000.0",
          "end": "1656080520000.0",
          "goal": 2
      }, 
      {
          "appId": "96246913",
          "creatorAddress": "XOBID66KBZ4C4ZZLEQGCHK2L2AIRCOS2XCS726XDCEJRJYSZWTZ64JN3RQ",
          "name": "test2",
          "description": "test2",
          "imageUrl": "test2",
          "start": "1655907720000.0",
          "end": "1656080520000.0",
          "goal": 2
      }
    ]
   ```
  ---

- GET `/api/applications?creatorAddress=...`
  - request parameters: creatorAddress
  - response body content: all the project created by the specified creatorAddress
  ```json
    [
      {
          "appId": "96246912",
          "creatorAddress": "R3Z6A6BUXWRYZ3IFBSK7Y54EBN6FRBSYGS4GNTNE2DB5GXJAC64JOMNFNI",
          "name": "test",
          "description": "test",
          "imageUrl": "test",
          "start": "1655907720000.0",
          "end": "1656080520000.0",
          "goal": 2
      }
    ]
   ```
  ---

- GET `/api/application?appId=...`
  - request parameters: appId
  - response body content: the application with the specified appId
  ```json
    [
      {
          "appId": "96246912",
          "creatorAddress": "R3Z6A6BUXWRYZ3IFBSK7Y54EBN6FRBSYGS4GNTNE2DB5GXJAC64JOMNFNI",
          "name": "test",
          "description": "test",
          "imageUrl": "test",
          "start": "1655907720000.0",
          "end": "1656080520000.0",
          "goal": 2
      }
    ]
   ```
  ---

- GET `/api/funder?funderAddress=...&&appInfo=...`
  - request parameters: funderAddress, appInfo {1 or 0} (optional)
  - response body content: all the funded applications from a specified funderAddress and appInfo (optional)
  ```json
    [
      {
          "funderAddress": "XOBID66KBZ4C4ZZLEQGCHK2L2AIRCOS2XCS726XDCEJRJYSZWTZ64JN3RQ",
          "amount": "1",
          "appId": "96246912",
          "creatorAddress": "R3Z6A6BUXWRYZ3IFBSK7Y54EBN6FRBSYGS4GNTNE2DB5GXJAC64JOMNFNI",
          "name": "test",
          "description": "test",
          "imageUrl": "test",
          "start": "1655907720000.0",
          "end": "1656080520000.0",
          "goal": 2
      }, 
      {
          "funderAddress": "XOBID66KBZ4C4ZZLEQGCHK2L2AIRCOS2XCS726XDCEJRJYSZWTZ64JN3RQ",
          "amount": "1",
          "appId": "96246913",
          "creatorAddress": "R3Z6A6BUXWRYZ3IFBSK7Y54EBN6FRBSYGS4GNTNE2DB5GXJAC64JOMNFNI",
          "name": "test2",
          "description": "test2",
          "imageUrl": "test2",
          "start": "1655907720000.0",
          "end": "1656080520000.0",
          "goal": 2
      }
    ]
   ```
  ---

- GET `/api/funder?funderAddress=...&&appId=...&&appInfo=...`
  - request parameters: funderAddress, appId, appInfo {1 or 0} (optional)
  - response body content: the funded amount invested from the specified funderAddress related to a specific application and the appInfo (optional)
  ```json
    [
      {
          "funderAddress": "XOBID66KBZ4C4ZZLEQGCHK2L2AIRCOS2XCS726XDCEJRJYSZWTZ64JN3RQ",
          "amount": "1",
          "appId": "96246912",
          "creatorAddress": "R3Z6A6BUXWRYZ3IFBSK7Y54EBN6FRBSYGS4GNTNE2DB5GXJAC64JOMNFNI",
          "name": "test",
          "description": "test",
          "imageUrl": "test",
          "start": "1655907720000.0",
          "end": "1656080520000.0",
          "goal": 2
      }
    ]
   ```
  ---

- GET `/api/funded`
  - request parameters: appId
  - response body content: total funded amount related to a specific appId
  ```json
    [
      {
          "amount": "3",
      }
    ]
   ```
## Database
For persistence the app use SQLite3, a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. (https://www.sqlite.org/docs.html)

### Database Tables

- Table `application` - contains the applications created: appId (PK), creatorAddress, name, description, imagUrl, start, end, goal.
- Table `fundedApplication` - contains all the investments made by investors in the various projects : funderAddress, appId, amount.

