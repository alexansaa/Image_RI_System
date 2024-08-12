<a name="readme-top"></a>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

# 📖 [Search Your Image app] <a name="about-project"></a>

**[Search Your Image app]**
Search Your Image app helps you looking for other images that looks like the given image. This app uses Caltech tensorflow_dataset for training and testing, for that reason test images have better results than other images. The front-end project presents test images for testing the model and its results. The model have been trainded using a custom neural network formed by 4 convolutional block which you can check from "imageClasification_custom_256.ipynb". The model also uses Knn model to identify images similar to the requested image.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="[https://developer.mozilla.org/en-US/docs/Web/HTML](https://nextjs.org/)">Next.js</a></li>
     <li><a href="https://developer.mozilla.org/en-US/docs/Web/css">CSS</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="[https://guides.rubyonrails.org/](https://azure.microsoft.com/es-mx/free/search/?&ef_id=_k_Cj0KCQjwwuG1BhCnARIsAFWBUC3eyc1_gk4Gwd9DixXbLk6LXgg5y0vxQBgXzTQLi56teT5G100u6X8aAtx8EALw_wcB_k_&OCID=AIDcmmvcssag76_SEM__k_Cj0KCQjwwuG1BhCnARIsAFWBUC3eyc1_gk4Gwd9DixXbLk6LXgg5y0vxQBgXzTQLi56teT5G100u6X8aAtx8EALw_wcB_k_&gad_source=1&gclid=Cj0KCQjwwuG1BhCnARIsAFWBUC3eyc1_gk4Gwd9DixXbLk6LXgg5y0vxQBgXzTQLi56teT5G100u6X8aAtx8EALw_wcB)">Azure</a></li>
  </ul>
</details>

### Key Features <a name="key-features"></a>

- **[Image Retrieval System]**
- **[Caltech DataSet]**
- **[Custom Convolutional Model]**
- **[Knn Model]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

To get a local copy up and running, follow these steps.

### Prerequisites

In order to run this project you need to enable a jupyter lab enviroment where you can run "imageClasification_custom_256.ipynb" file. Then run the file installing the appropiate modules (preferable a python virtual enviroment), and compile and save output modules which are going to be used into the web app project:

### Setup

Clone this repository to your desired folder:

```sh
  cd my-folder
  git https://github.com/alexansaa/Image_RI_System.git
```

### Install

Install the back-end project with:

```sh
  cd my-project/image_ri_back
  python.exe -m venv venv
  ./venv/Scritps/activate
  pip install requirements.txt (if not available please install dependencies manually)
```

Install the front-end project with:

```sh
  cd my-project/image_ri_front
  npm run dev
```

### Usage

To run the project, navigate to http://localhost:3000 and upload your own image to look for results

### Deployment

Comming soon!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- AUTHORS -->

## 👥 Authors <a name="authors"></a>

👤 **Alexander**

- GitHub: [GitHub](https://github.com/alexansaa)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/alexander-saavedra-2803b1b6/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE FEATURES -->

## 🔭 Future Features <a name="future-features"></a>

- [ ] **[Bigger dataset]**
- [ ] **[Finner neural net]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/alexansaa/Image_RI_System/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

If you like this project, please give it a star on GitHub

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgments <a name="acknowledgements"></a>

I would like to thank Escuela Politecnica Nacional for giving me this project to build

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE.md) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
