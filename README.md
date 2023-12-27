# Fend

An Electron application with React and TypeScript that can be used to Harden Ubuntu based Operating Systems

## What is Hardening ?
<p>
Hardening is a collection of tools, techniques, and best practices to reduce vulnerability in applications. The goal of hardening is to reduce security risk by eliminating and condensing the attack surface of a system.
</p>
The goals of hardening are :
<ol>
<li> Remove functionality that isn't needed for the user-role </li>
<li> Patch and update promptly </li>
<li> Maintain secure config settings </li>
</ol>

## Key Features

[<img src="https://github.com/varun7singh/Fend/assets/87320561/6700efd8-18ce-4340-97d7-fb897e5404a7" width="50%">](https://www.youtube.com/watch?v=w85RHYcxpbM)

<ol> 
<li> Clean and Intuitive GUI </li>
<li> Custom scripts can be added </li>
<li> Segregate clients into groups for ease of host management </li>
<li> Logging of each run </li>
<li> Password-less authentication with client nodes. </li>
</ol>

### Why Ansible ?
<ul>
  <li>
    Ansible is an open-source automation platform that helps manage large groups of computer systems. It is a standard way for configuration management in Linux computer systems.
  </li>
  <li>
    Agent-less
  </li>
  <li>
    Idempotent
  </li>
  <li>
    Ease of maintainability and readability
  </li>
  <li>
    Modularity and re-usable
  </li>
</ul>

## Future Scope
<ul>
  <li>
    Test on more versions of Ubuntu
  </li>
  <li>
    Advanced logging
  </li>
  <li>
    Add more security modules to have better security coverage.
  </li>
  <li>
    Additional GUI features like : Dynamic Inventory, Script Editing etc.
  </li>
  <li>
    Add from pre-defined scripts that are based on different security standards.
  </li>
</ul>

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
