#!/usr/bin/env groovy

// Jenkins Pipeline to deploy HealthChart Inpatient Asthma application

properties([
  buildDiscarder(
    logRotator(
      daysToKeepStr: "7",
      numToKeepStr: "10"
    )
  ),
  pipelineTriggers([
    githubPush()
  ])
])

def vaultConfig = [
  engineVersion: 2,
  vaultNamespace: "cds",
  vaultCredentialId: "cds-vault-approle",
  vaultUrl: "https://risvault.research.chop.edu"
]

def vaultSecrets = [
  [
    path: 'kv/admin/github/is-jenkins',
    secretValues: [
      [envVar: 'GITHUB_ACCESS_TOKEN', vaultKey: 'access-token'],
      [envVar: 'GITHUB_ACCESS_USER', vaultKey: 'username'],
    ]
  ]
]

def deployApp(server) {
  def repoName = "healthchart-inpatient-asthma"
  sshPublisher(
    publishers: [
      sshPublisherDesc(
        configName: server,
        verbose: false,
        transfers: [
          sshTransfer(
            cleanRemote: true,
            execCommand: "cd /usr/local/care/interventions/${repoName} && sh scripts/deploy.sh && rm -rf scripts/",
            remoteDirectory: "interventions/${repoName}",
            sourceFiles: "scripts/deploy.sh,release.zip"
      )]
    )]
  )
}

node("dbhi") {

  stage("Prep Workspace") {
    deleteDir()
  }

  stage("Checkout Source") {
    checkout scm
  }

  stage("Package Release") {
    try {
      sh '''
        npm install
        npm run build
      '''
    } catch (e) {
      deleteDir()
      throw e
    }
  }

  stage("Deploy Service") {
    try {
      if (env.BRANCH_NAME == "main") {
        echo "Deploy code to test server"
        deployApp("intvwebql1")
      } else {
        echo "Deploy code to dev server"
        deployApp("intvwebql2")
      }
    } catch (e) {
      deleteDir()
      throw e
    }
  }

  withVault(configuration: vaultConfig, vaultSecrets: vaultSecrets) {
    stage("Create Release") {
      try {
        if (env.BRANCH_NAME == "main") {
          env.VERSION = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          env.PRERELEASE = "true"
          sh '''
            sh scripts/github_release.sh
          '''
        }
      } catch (e) {
        deleteDir()
        throw e
      }
    }
  }

  stage("Clean Workspace") {
    deleteDir()
  }
}