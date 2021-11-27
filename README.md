# React Marginal Tax Rate

This is a simple React app that takes two inputs and calculates the total income tax. The application queries Points mock API and calculates the total income tax for an inputted salary and tax year.

<img src="https://user-images.githubusercontent.com/23065276/143669729-6dc59388-4356-4e00-bfbe-88e000519197.png" height="75%" width="75%" />

## Technology
This project was created using React and styled with Bootstrap.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Data
The backend is a mock API that returns marginal tax rates based on the inputted year. The API is accessible via a GET request to `http://localhost:5000/tax-calculator/brackets/{tax_year}`, which returns a JSON object that includes income tax brackets and the corresponding tax rates. To run the mock API server:
```
docker pull ptsdocker16/interview-test-server\
docker run --init -p 5000:5000 -it ptsdocker16/interview-test-server
```
