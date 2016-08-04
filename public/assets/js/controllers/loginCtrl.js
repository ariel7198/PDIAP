(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('loginCtrl', function($scope, $rootScope, $location, $mdDialog, projetosAPI) {

		$scope.login = function() {
			const username = $scope.user.username;
			const password = $scope.user.password;

			projetosAPI.postLogin(username,password)
			.success(function(projeto) { // authentication OK
				$rootScope.logado = true;
				$scope.message = 'Sucesso';
				$scope.erro = false;
				localStorage.setItem('token','TOKEN_TESTE');
				console.log("foiii");
				$mdDialog.hide();
				$location.url('/home');
			})
			.error(function() { // authentication failed
				$rootScope.logado = false;
				$scope.message = 'Os dados estão incorretos.';
				$scope.erro = true;
				console.log("deu merda");
			});
		};

		let enviarEmail = function(username) {
			projetosAPI.postRedefinir(username)
			.success(function(data) {
				$scope.email = data;
				console.log('EMAIL ENVIADO');
				let showAlert = function(ev) {
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(false)
						.title('Quase lá...')
						.textContent('Foi enviado um email para '+$scope.email+', onde seguem as instruções para a alteração da senha.')
						.ok('OK')
						.targetEvent(ev)
					);
				};
				showAlert();
			})
			.error(function(status) {
				console.log('EMAIL NÃO FOI ENVIADO AF TIO');
				let showConfirmDialog = function(ev) {
					var confirm = $mdDialog.confirm()
					.title('Oxe...')
					.textContent('Houve algum erro ao enviar o email. Tente mais tarde ou então, entre em contato conosco.')
					.targetEvent(ev)
					.theme('error')
					.ok('Continuar')
					.cancel('Entrar em contato');
					$mdDialog.show(confirm).then(function() {}
					, function() {
						$location.url('/');
					});
				};
				showConfirmDialog();
			});
		};

		$scope.showPrompt = function(ev) {
			var confirm = $mdDialog.prompt()
			.title('RECUPERAR SENHA')
			.placeholder('Username')
			.ariaLabel('Username')
			.targetEvent(ev)
			.ok('Enviar >')
			.cancel('Fechar');
			$mdDialog.show(confirm).then(function(result) {
				// console.log(result);
				let username = ({
					username: result
				});
				enviarEmail(username);
				console.log(username);
			}, function() {
				console.log('fechou');
			});
		};
	});
})();
