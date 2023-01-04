pipeline{
  agent any
  
  stages{
    stage('Clonar repositório'){
      steps{
        git branch: 'main', url: 'https://github.com/VictorDeCamilo/testes-e2e-ebac-shop.git'
      }
    }
    stage('Instalar dependências'){
      steps{
        sh 'npm install'
      }
    }
    stage('Executar os testes'){
      steps{
        sh 'npx cypress run'
      }
    }
  }
}
