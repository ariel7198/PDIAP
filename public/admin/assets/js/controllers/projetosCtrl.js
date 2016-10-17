(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.controller('projetosCtrl', function($scope, $rootScope, $q, $window, $mdDialog, adminAPI) {

		$rootScope.projetos = [];
		$scope.searchProject = "";
		$scope.idAprovados = [];

		let countTotal = 0;
		$scope.hosp = [];
		let carregarProjetos = function() {
			adminAPI.getTodosProjetos()
			.success(function(projetos) {
				angular.forEach(projetos, function (value, key) {
					let obj = ({
						_id: value._id,
						numInscricao: value.numInscricao,
						nomeProjeto: value.nomeProjeto,
						nomeEscola: value.nomeEscola,
						categoria: value.categoria,
						eixo: value.eixo,
						aprovado: value.aprovado,
						participa: value.participa,
						integrantes: value.integrantes
					});
					$rootScope.projetos.push(obj);
				});
				console.log($rootScope.projetos);
			})
			.error(function(status) {
				console.log(status);
			});
		};
		$scope.carregarProjetos = carregarProjetos;

		// $scope.querySearch = function querySearch (query) {
		// 	let deferred = $q.defer();
		// 	return deferred;
		// }

		$scope.count = 0;
		$scope.contador = function(check,idProj) {
			if (check) {
				$scope.count--;
				let index = $scope.idAprovados.indexOf(idProj);
				$scope.idAprovados.splice(index, 1);
			}
			else {
				$scope.count++;
				$scope.idAprovados.push(idProj);
			}
			// console.log($scope.idAprovados);
		}

		$scope.visualizarDetalhes = function(projeto,ev) {
			$mdDialog.show({
				controller: function dialogController($scope, $rootScope, $mdDialog, $mdToast, adminAPI) {
					$scope.details = projeto;
					$scope.idIntegrantesPresentes = [];
					$scope.idIntegrantesAusentes = [];
					// let carregaIds = function() {
					// 	angular.forEach(projeto.integrantes, function (value, key) {
					// 		if (value.presenca === true) {
					// 			$scope.idIntegrantesPresentes.push(value._id);
					// 		}
					// 	});
					// 	console.log($scope.idIntegrantesPresentes);
					// }
					// carregaIds();
					$scope.contador1 = function(check,idIntegrante) {
						if (check) {
							let index = $scope.idIntegrantesPresentes.indexOf(idIntegrante);
							if (index !== -1) {
								$scope.idIntegrantesPresentes.splice(index, 1);
							}
							$scope.idIntegrantesAusentes.push(idIntegrante);
						}
						else {
							let index = $scope.idIntegrantesAusentes.indexOf(idIntegrante);
							console.log(index);
							if (index !== -1) {
								$scope.idIntegrantesAusentes.splice(index, 1);
							}
							$scope.idIntegrantesPresentes.push(idIntegrante);
						}
						console.log("Presentes: "+$scope.idIntegrantesPresentes);
						console.log("Ausentes: "+$scope.idIntegrantesAusentes);
					}
					$scope.setPresenca = function() {
						adminAPI.putPresencaProjetos($scope.idIntegrantesPresentes,$scope.idIntegrantesAusentes)
						.success(function(data, status) {
							$scope.toast('Presença cadastrada com sucesso!','success-toast');
							var count = 0;
							if ($scope.idIntegrantesPresentes.length !== 0) {
								for (var i = 0; i < $rootScope.projetos.length; i++) {
									if ($rootScope.projetos[i]._id === $scope.details._id) {
										angular.forEach($rootScope.projetos[i].integrantes, function (value, key) {
											count++;
											for (var x = 0; x < $scope.idIntegrantesPresentes.length; x++) {
												if (value._id === $scope.idIntegrantesPresentes[x]) {
													$rootScope.projetos[i].integrantes[count-1].presenca = true;
												}
											}
										});
									}
								}
							}
							if ($scope.idIntegrantesAusentes.length !== 0) {
								for (var i = 0; i < $rootScope.projetos.length; i++) {
									if ($rootScope.projetos[i]._id === $scope.details._id) {
										angular.forEach($rootScope.projetos[i].integrantes, function (value, key) {
											count++;
											for (var x = 0; x < $scope.idIntegrantesAusentes.length; x++) {
												if (value._id === $scope.idIntegrantesAusentes[x]) {
													$rootScope.projetos[i].integrantes[count-1].presenca = false;
												}
											}
										});
									}
								}
							}

							$scope.idIntegrantesPresentes = [];
							$scope.idIntegrantesAusentes = [];
						})
						.error(function(status) {
							$scope.toast('Falha.','failed-toast');
							console.log('Error: '+status);
						});
					}
					$scope.toast = function(message,tema) {
						var toast = $mdToast.simple().textContent(message).action('✖').position('top right').theme(tema).hideDelay(4000);
						$mdToast.show(toast);
					};
					$scope.hide = function() {
						$mdDialog.hide();
					};
					$scope.cancel = function() {
						$mdDialog.cancel();
					};
				},
				templateUrl: 'admin/views/details.presenca_projetos.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: false,
				fullscreen: true // Only for -xs, -sm breakpoints.
			});
		};

		$scope.update = function() {
			let ids = $scope.idAprovados;
			adminAPI.putSetAprovados(ids)
			.success(function(data, status) {
				$scope.selectedo = false;
				let showAlert = function(ev) {
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(false)
						.textContent('Projeto(s) atualizado(s) com sucesso!')
						.ok('OK')
						.targetEvent(ev)
					).then(function(result) {
						$window.location.reload();
					}, function() {});
				};
				showAlert();
				console.log(status);
				console.log(data);
			})
			.error(function(status) {
				console.log('Error: '+status);
			});
		}

		$scope.remove = function() {
			let ids = $scope.idAprovados;
			adminAPI.putUnsetAprovados(ids)
			.success(function(data, status) {
				$scope.selectedo = false;
				let showAlert = function(ev) {
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(false)
						.textContent('Projeto(s) atualizado(s) com sucesso!')
						.ok('OK')
						.targetEvent(ev)
					).then(function(result) {
						$window.location.reload();
					}, function() {});
				};
				showAlert();
				console.log(status);
				console.log(data);
			})
			.error(function(status) {
				console.log('Error: '+status);
			});
		}

		// $scope.ordenacao = ['categoria','eixo'];
		$scope.ordenarPor = function(campo) {
			$scope.ordenacao = campo;
		}

		$scope.query = 'nomeProjeto';
		$scope.setBusca = function(campo) {
			$scope.query = campo;
		}

		carregarProjetos();

	});
})();
