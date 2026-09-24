pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dinety/portfolio'
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build \
                    -t ${DOCKER_IMAGE}:${BUILD_NUMBER} \
                    .
                '''
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | \
                        docker login \
                        -u "$DOCKER_USERNAME" \
                        --password-stdin

                        docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Portfolio image pushed successfully."
            echo "Image: ${DOCKER_IMAGE}:${BUILD_NUMBER}"
        }

        failure {
            echo "Portfolio CI pipeline failed."
        }
    }
}