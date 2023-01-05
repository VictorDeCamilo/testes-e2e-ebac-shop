pipeline{
  agent any
  
  options{
    ansiColor('xterm')
  }
  
  stages{
    stage('Clonar repositório'){
        git branch: 'main', url: 'https://github.com/VictorDeCamilo/testes-e2e-ebac-shop.git'
    }
    stage('Instalar dependências'){
        bat 'npm install'
    }
    stage('Executar os testes'){
        bat 'npx cypress run'
    }
  }
}
