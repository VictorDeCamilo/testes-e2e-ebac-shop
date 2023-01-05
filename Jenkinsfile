pipeline{
  agent any
  
  options{
    ansiColor('xterm')
  }
  
  stages{
    stage('Clonar repositório'){
      steps{
            git branch: 'main', url: 'https://github.com/VictorDeCamilo/testes-e2e-ebac-shop.git'
      } 
    }
    stage('Instalar dependências'){
      steps{
            powershell 'npm install'
            powershell 'npx cypress verify'
      }
    }
    stage('Executar os testes'){
      steps{
            powershell 'npm run cy:run --env NO_COLOR=1'
      }  
    }
  }
}
