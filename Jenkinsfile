pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dinety/portfolio'
        GITOPS_REPO = 'git@github.com:TyDine22/portfolio-gitops.git'
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

        stage('Update GitOps Repository') {
            steps {
                sshagent(credentials: ['gitops-github-ssh']) {
                    sh '''
                        rm -rf gitops-repo

                        git clone ${GITOPS_REPO} gitops-repo

                        cd gitops-repo

                        sed -i '/repository: dinety\\/portfolio/{n;s/tag: .*/tag: "'${BUILD_NUMBER}'"/;}' \
                            portfolio/values.yaml

                        git config user.name "Jenkins"
                        git config user.email "jenkins@localhost"

                        git add portfolio/values.yaml

                        git commit \
                            -m "Deploy portfolio build ${BUILD_NUMBER}"

                        git push origin main
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Portfolio CI pipeline completed successfully."
            echo "Image: ${DOCKER_IMAGE}:${BUILD_NUMBER}"
        }

        failure {
            echo "Portfolio CI pipeline failed."
        }
    }
}