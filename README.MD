# INoteBook

## Application Deployment:
- [INoteBook](https://inote.hirentimbadiya.me/)
- [DevOps Resources](https://github.com/hirentimbadiya/notesapp-devops/) (DevOps Resoueces Such As Jenkins Groovy Scripts, Helm Chart Templates and Prometheus Configurations)

## Description
- Developed a robust note-taking application from scratch utilizing Express.js for the backend server and React.js for the frontend, ensuring a seamless user experience.
- Containerized the application using Docker and orchestrated deployment on Google Kubernetes Engine (GKE) leveraging Helm charts, ensuring scalability and reliability.
- Automated the entire CI/CD process using Jenkins, Groovy script, and Jenkins shared libraries, streamlining development workflows and reducing manual errors.
- Implemented SonarQube code scanning within the Jenkins pipeline to enforce code quality standards and enhance overall project integrity.
- Utilized Prometheus as a metrics collector to monitor Kubernetes pods and deployments, enhancing observability and facilitating proactive issue resolution.
- Visualized Kubernetes metrics through Grafana public dashboard, providing comprehensive insights into system performance and resource utilization.
- Configured Kubernetes ingress for external access to the application, ensuring seamless user interaction, and integrated HTTPS load balancer with a managed certificate for enhanced security.
- Implemented horizontal pod autoscaling to dynamically adjust resources based on demand, optimizing application performance and resource utilization.

## Technologies Used
- React.js
- Express.js
- Docker
- Kubernetes
- Helm
- Jenkins
- Groovy
- SonarQube
- Prometheus
- Grafana
- HTTPS Load Balancer
- Horizontal Pod Autoscaling
- Google Kubernetes Engine (GKE)
- MongoDB
- Google Managed SSL Certificate

## Features
- User Authentication
- Note Creation
- Note Deletion
- Note Update
- Secure HTTPS Connection
- Horizontal Pod Autoscaling
- Metrics Monitoring
- Code Quality Scanning
- CI/CD Pipeline
- Containerization

## Installation
1. Clone the repository
```bash
git clone https://github.com/hirentimbadiya/notes-app.git
```

2. Navigate to server directory and install dependencies
```bash
cd server
npm install
```

3. Navigate to client directory and install dependencies
```bash
cd client
npm install
```

4. Modify the .env file in the server directory with your MongoDB connection string and JWT secret key
```bash
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET_KEY
```

5. Modify the .env file in the client directory with the server URL
```bash
REACT_APP_BACKEND_HOST=YOUR_SERVER_URL
# Example: 
# REACT_APP_BACKEND_HOST=http://localhost:3001
```

6. Start the server
```bash
cd server
npm run dev
```

7. Start the client
```bash
npm run start
```

8. Access the application at http://localhost:3000

## Author
### Hiren Timbadiya
- [LinkedIn](https://linkedin.com/in/hirentimbadiya74/)
- [GitHub](https://github.com/hirentimbadiya/)

## License
This project is open source and available under the [MIT License](LICENSE).