(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('updateCtrl', function($scope, $rootScope, $parse, $location, $mdToast, $timeout, projetosAPI) {

		// $rootScope.header = 'Alterar projeto';
		$scope.alterado = false;
		$scope.orientadores = [];
		$scope.alunos = [];
		$scope.emails1 = [];

		$scope.update = function(projeto) {
			console.log(projeto);
			projetosAPI.putProjeto(projeto)
			.success(function(projeto){
				console.log(projeto);
				$scope.alterado = true;
				$scope.toast('Alteração realizada com sucesso!','success-toast');
				// maskCEP();
				$scope.carregarProjeto();
			})
			.error(function(status){
				console.log('update error: '+status);
				$scope.toast('Falha na alteração','failed-toast');
			});
		};

		let updateIntegrante = function(pacote) {
			projetosAPI.putIntegrante(pacote)
			.success(function(data){
				console.log(data);
				$scope.alterado = true;
				$scope.toast('Alteração realizada com sucesso!','success-toast');
			})
			.error(function(status){
				console.log('update error: '+status);
				$scope.toast('Falha na alteração','failed-toast');
			});
		};
		$scope.orientadoresUpdate = [];
		$scope.updateOrientadores = function() {
			for (var i = 1; i <= $scope.dynamicFields11.length; i++) {
				if (i == 1) {
					var pacote = ({
						tipo: 'Orientador',
						nome: $scope.projeto3.nomeOrientador1,
						email: $scope.projeto3.emailOrientador1,
						cpf: $scope.projeto3.cpfOrientador1,
						telefone: $scope.projeto3.telefoneOrientador1,
						tamCamiseta: $scope.projeto3.tamCamisetaOrientador1,
						integrantes_id: $scope.projeto3.idOrientador1
					});
					// $scope.orientadoresUpdate.push(pacote);
					updateIntegrante(pacote);
				}
				if (i == 2) {
					var pacote = ({
						tipo: 'Orientador',
						nome: $scope.projeto3.nomeOrientador2,
						email: $scope.projeto3.emailOrientador2,
						cpf: $scope.projeto3.cpfOrientador2,
						telefone: $scope.projeto3.telefoneOrientador2,
						tamCamiseta: $scope.projeto3.tamCamisetaOrientador2,
						integrantes_id: $scope.projeto3.idOrientador2
					});
					// $scope.orientadoresUpdate.push(pacote);
					updateIntegrante(pacote);
				}
			}
		};
		$scope.alunosUpdate = [];
		$scope.updateAlunos = function() {
			//var dados = JSON.stringify({ integrantes: {nome: 'jailson' }});
			// console.log($scope.dynamicFields22.length);
			for (var i = 1; i <= $scope.dynamicFields22.length; i++) {
				if (i == 1) {
					var pacote = ({
						tipo: 'Aluno',
						nome: $scope.projeto4.nomeAluno1,
						email: $scope.projeto4.emailAluno1,
						cpf: $scope.projeto4.cpfAluno1,
						telefone: $scope.projeto4.telefoneAluno1,
						tamCamiseta: $scope.projeto4.tamCamisetaAluno1,
						_id: $scope.projeto4.idAluno1
					});
					// $scope.alunosUpdate.push(pacote);
					updateIntegrante(pacote);
				}
				if (i == 2) {
					var pacote = ({
						tipo: 'Aluno',
						nome: $scope.projeto4.nomeAluno2,
						email: $scope.projeto4.emailAluno2,
						cpf: $scope.projeto4.cpfAluno2,
						telefone: $scope.projeto4.telefoneAluno2,
						tamCamiseta: $scope.projeto4.tamCamisetaAluno2,
						_id: $scope.projeto4.idAluno2
					});
					// $scope.alunosUpdate.push(pacote);
					updateIntegrante(pacote);
				}
				if (i == 3) {
					var pacote = ({
						tipo: 'Aluno',
						nome: $scope.projeto4.nomeAluno3,
						email: $scope.projeto4.emailAluno3,
						cpf: $scope.projeto4.cpfAluno3,
						telefone: $scope.projeto4.telefoneAluno3,
						tamCamiseta: $scope.projeto4.tamCamisetaAluno3,
						_id: $scope.projeto4.idAluno3
					});
					// $scope.alunosUpdate.push(pacote);
					updateIntegrante(pacote);
				}
			}
			for (var i in $scope.projeto5.hospedagem) {
				angular.forEach($scope.alunos, function (value, key){
					if ($scope.projeto5.hospedagem[i] === value.nome) {
						$scope.projeto5.hospedagem.splice(i, 1);
					}
				});
			}
		};

		projetosAPI.getProjeto()
		.success(function(data) {
			console.log(data);
			var x = 0;
			var y = 0;

			angular.forEach(data.integrantes, function (value, key){
				if (value.tipo === 'Orientador') {
					$scope.orientadores.push(value);
					x++;
					var str0 = 'projeto3.idOrientador'+x;
					var str1 = 'projeto3.nomeOrientador'+x;
					var str2 = 'projeto3.emailOrientador'+x;
					var str3 = 'projeto3.cpfOrientador'+x;
					var str4 = 'projeto3.telefoneOrientador'+x;
					var str5 = 'projeto3.tamCamisetaOrientador'+x;
					var model0 = $parse(str0);
					var model1 = $parse(str1);
					var model2 = $parse(str2);
					var model3 = $parse(str3);
					var model4 = $parse(str4);
					var model5 = $parse(str5);

					value.cpf = value.cpf.substring(0,3) + "." + value.cpf.substring(3);
					value.cpf = value.cpf.substring(0,7) + "." + value.cpf.substring(7);
					value.cpf = value.cpf.substring(0,11) + "-" + value.cpf.substring(11);

					value.telefone = "(" + value.telefone.substring(0);
					value.telefone = value.telefone.substring(0,3) + ")" + value.telefone.substring(3);
					value.telefone = value.telefone.substring(0,4) + " " + value.telefone.substring(4);
					value.telefone = value.telefone.substring(0,9) + "-" + value.telefone.substring(9);

					model0.assign($scope, value._id);
					model1.assign($scope, value.nome);
					model2.assign($scope, value.email);
					model3.assign($scope, value.cpf);
					model4.assign($scope, value.telefone);
					model5.assign($scope, value.tamCamiseta);
				} else if (value.tipo === 'Aluno') {
					$scope.alunos.push(value);
					y++;
					var str0 = 'projeto4.idAluno'+y;
					var str1 = 'projeto4.nomeAluno'+y;
					var str2 = 'projeto4.emailAluno'+y;
					var str3 = 'projeto4.cpfAluno'+y;
					var str4 = 'projeto4.telefoneAluno'+y;
					var str5 = 'projeto4.tamCamisetaAluno'+y;
					var model0 = $parse(str0);
					var model1 = $parse(str1);
					var model2 = $parse(str2);
					var model3 = $parse(str3);
					var model4 = $parse(str4);
					var model5 = $parse(str5);

					value.cpf = value.cpf.substring(0,3) + "." + value.cpf.substring(3);
					value.cpf = value.cpf.substring(0,7) + "." + value.cpf.substring(7);
					value.cpf = value.cpf.substring(0,11) + "-" + value.cpf.substring(11);

					value.telefone = "(" + value.telefone.substring(0);
					value.telefone = value.telefone.substring(0,3) + ")" + value.telefone.substring(3);
					value.telefone = value.telefone.substring(0,4) + " " + value.telefone.substring(4);
					value.telefone = value.telefone.substring(0,9) + "-" + value.telefone.substring(9);

					model0.assign($scope, value._id);
					model1.assign($scope, value.nome);
					model2.assign($scope, value.email);
					model3.assign($scope, value.cpf);
					model4.assign($scope, value.telefone);
					model5.assign($scope, value.tamCamiseta);
				}
			});
			// console.log($scope.alunos);
			// console.log($scope.orientadores);
			for (var i = 0; i < $scope.orientadores.length; i++) {
				addOrientadorUpdate();
			}
			for (var i = 0; i < $scope.alunos.length; i++) {
				addAlunoUpdate();
			}
		});

		$scope.emails1 = [];
		$scope.loadEmails1 = function() {
			$scope.emails1 = [];
			return $timeout(function() {
				for (var i = 1; i <= $scope.dynamicFields11.length; i++) {
					if (i === 1 && $scope.projeto3.emailOrientador1 !== undefined) {
						$scope.emails1.push($scope.projeto3.emailOrientador1);
					}
					if (i === 2 && $scope.projeto3.emailOrientador2 !== undefined) {
						$scope.emails1.push($scope.projeto3.emailOrientador2);
					}
				}
				for (var i = 1; i <= $scope.dynamicFields22.length; i++) {
					if (i === 1 && $scope.projeto4.emailAluno1 !== undefined) {
						$scope.emails1.push($scope.projeto4.emailAluno1);
					}
					if (i === 2 && $scope.projeto4.emailAluno2 !== undefined) {
						$scope.emails1.push($scope.projeto4.emailAluno2);
					}
					if (i === 3 && $scope.projeto4.emailAluno3 !== undefined) {
						$scope.emails1.push($scope.projeto4.emailAluno3);
					}
				}
			}, 650);
		};

		$scope.carregaIntegrantes = function() {
			$scope.orientadores = [];
			$scope.alunos = [];
			projetosAPI.getProjeto()
			.success(function(data) {
				angular.forEach(data.integrantes, function (value, key){
					if (value.tipo === 'Orientador') {
						$scope.orientadores.push(value);
					} else if (value.tipo === 'Aluno') {
						$scope.alunos.push(value);
					}
				});
			});
		};

		$scope.verificaUsername = function(username) {
			for (var i in $scope.conta.usernames) {
				if ($scope.conta.usernames[i] == username) {
					$scope.contaForm.username.$setValidity('duplicado',false);
					break; // importante parar caso email seja igual, senão não funciona
				} else {
					$scope.contaForm.username.$setValidity('duplicado',true);
				}
			}
		};

		// Funções construtoras dos campos dinâmicos dos integrantes
		// =========================================================================

		$scope.dynamicFields11 = [];
		$scope.dynamicFields22 = [];
		$scope.btnAdd11 = true;
		$scope.btnAdd22 = true;
		$scope.count11 = 0;
		$scope.count22 = 0;

		let addOrientadorUpdate = function() {
			$scope.count11++;
			$scope.dynamicFields11.push(
				{nome:'nomeOrientador'+$scope.count11, email:'emailOrientador'+$scope.count11, cpf:'cpfOrientador'+$scope.count11, telefone:'telefoneOrientador'+$scope.count11, camiseta:'tamCamisetaOrientador'+$scope.count11}
			);
			if ($scope.count11 === 2) {
				$scope.btnAdd11 = false;
			}
		};
		$scope.addOrientadorUpdate = addOrientadorUpdate;

		let addAlunoUpdate = function() {
			$scope.count22++;
			$scope.dynamicFields22.push(
				{nome:'nomeAluno'+$scope.count22, email:'emailAluno'+$scope.count22, cpf:'cpfAluno'+$scope.count22, telefone:'telefoneAluno'+$scope.count22, camiseta:'tamCamisetaAluno'+$scope.count22}
			);
			if ($scope.count22 === 3) {
				$scope.btnAdd22 = false;
			}
		};
		$scope.addAlunoUpdate = addAlunoUpdate;

		$scope.removeOrientadorUpdate = function(index) {
			$scope.dynamicFields11.splice(index, 1);
			$scope.count11--;
			if ($scope.count11 !== 2) {
				$scope.btnAdd11 = true;
			}
		};
		$scope.removeAlunoUpdate = function(index) {
			$scope.dynamicFields22.splice(index, 1);
			$scope.count22--;
			if ($scope.count22 !== 3) {
				$scope.btnAdd22 = true;
			}
		};
		// =========================================================================

		$scope.alunosArray1 = [];

		$scope.montarIntegrantes1 = function(proj) {
			$scope.alunosArray1 = [];
			for (var i = 1; i <= $scope.dynamicFields22.length; i++) {
				if (i === 1) {
					$scope.alunosArray1.push(proj.nomeAluno1);
				}
				if (i === 2) {
					$scope.alunosArray1.push(proj.nomeAluno2);
				}
				if (i === 3) {
					$scope.alunosArray1.push(proj.nomeAluno3);
				}
			}
		};
	});
})();
