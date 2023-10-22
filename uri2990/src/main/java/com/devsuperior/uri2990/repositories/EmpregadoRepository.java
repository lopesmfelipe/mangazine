package com.devsuperior.uri2990.repositories;

import com.devsuperior.uri2990.dto.EmpregadoDeptDTO;
import com.devsuperior.uri2990.projections.EmpregadoDeptProjection;
import org.springframework.data.jpa.repository.JpaRepository;

import com.devsuperior.uri2990.entities.Empregado;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmpregadoRepository extends JpaRepository<Empregado, Long> {

    //SQL
    @Query(nativeQuery = true, value = "SELECT empregados.cpf, empregados.enome, departamentos.dnome " +
            "FROM empregados " +
            "INNER JOIN departamentos ON empregados.dnumero = departamentos.dnumero " +
            "WHERE empregados.cpf NOT IN ( " +
            "\t\tSELECT empregados.cpf " +
            "\t\tFROM empregados " +
            "\t\tINNER JOIN trabalha ON trabalha.cpf_emp = empregados.cpf " +
            ") " +
            "ORDER BY empregados.cpf")
    List<EmpregadoDeptProjection> search1();

    //SQL 2 option
    @Query(nativeQuery = true, value = "SELECT empregados.cpf, empregados.enome, departamentos.dnome " +
            "FROM empregados " +
            "INNER JOIN departamentos ON empregados.dnumero = departamentos.dnumero " +
            "LEFT JOIN trabalha ON trabalha.cpf_emp = empregados.cpf " +
            "WHERE trabalha.cpf_emp IS NULL " +
            "ORDER BY empregados.cpf")
    List<EmpregadoDeptProjection> search3();

    //JPQL
    @Query("SELECT new com.devsuperior.uri2990.dto.EmpregadoDeptDTO(obj.cpf, obj.enome, obj.departamento.dnome) " +
            "FROM Empregado obj " +
            "WHERE obj.cpf NOT IN ( " +
            "\t\tSELECT obj.cpf " +
            "\t\tFROM Empregado obj " +
            "\t\tINNER JOIN obj.projetosOndeTrabalha " +
            ") " +
            "ORDER BY obj.cpf")
    List<EmpregadoDeptDTO> search2();
}
