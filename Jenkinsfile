pipeline{
  agent any
  stages{
    stage("build"){
      steps{
        sh 'npm install'
        sh 'npm start'
      }
      stage("test"){
      steps{
        sh 'npm build'
      }
    }
  }
}
