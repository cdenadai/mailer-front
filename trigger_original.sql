BEGIN
 	DECLARE VI_PARAR, VI_USUARIOS, VI_DEPTOS INT DEFAULT 0;
     DECLARE VS_EMAILS, VS_EMAILS_DEPTO, VS_EMAILS_USERCLI, VS_ASSUNTO, VS_CORPO_TITULO, VS_OCORREN_PARA VARCHAR(1000) DEFAULT '';
 	DECLARE VS_CORPO_TEXTO TEXT DEFAULT '';    
     DECLARE VS_CLIENTE, VS_USERCLI_CHAM, VS_USERCLI_RESP VARCHAR(100) DEFAULT '';
   
 	DECLARE CURSORCH CURSOR FOR SELECT USUARIOS_CLIENTE, FKDEPTO_DEST FROM EMAILCFG E WHERE E.FKSISTEMAS = NEW.ID_SISTEMA AND E.OCORREN = NEW.TIPO;
 
 	DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET VI_PARAR = 1;
 
     IF OLD.HORAS_PREVISTA != NEW.HORAS_PREVISTA THEN
       INSERT INTO LOGS VALUES (0,NOW(),OLD.ID,'HORAS_PREVISTA',OLD.HORAS_PREVISTA,NEW.HORAS_PREVISTA,SESSION_USER());
     END IF;
     
     IF OLD.DATA_ENTREGA != NEW.DATA_ENTREGA THEN
       INSERT INTO LOGS VALUES (0,NOW(),OLD.ID,'DATA_ENTREGA',OLD.DATA_ENTREGA,NEW.DATA_ENTREGA,SESSION_USER());
     END IF;    
 
 
 	IF OLD.TIPO != NEW.TIPO THEN
     	SET VS_EMAILS = '';
 		OPEN CURSORCH;
 		REPEAT
 			FETCH CURSORCH INTO VI_USUARIOS, VI_DEPTOS;
 			
 			IF NOT VI_PARAR THEN
 				
 				SELECT (Ocorren_Descr(NEW.TIPO)) INTO VS_OCORREN_PARA;
 			
 				SELECT group_concat(email  SEPARATOR ';') INTO VS_EMAILS_DEPTO FROM GVMOPER
 					where ativo = 'S' and email is not null and departamento = VI_DEPTOS;
 				
 /*
 				IF VI_USUARIOS > 0 THEN
 					SELECT group_concat(email  SEPARATOR ';')  INTO VS_EMAILS_USERCLI from usercli where (id = NEW.ID_USER_CHAM or id = NEW.ID_USER_RESP) AND 
 						ativo = 'S' and (trim(email)) > '' and email is not null;
 				END IF;
 */                
 
 				IF (TRIM(VS_EMAILS_DEPTO)) > '' THEN
 					IF (TRIM(VS_EMAILS)) > '' THEN
 						SET VS_EMAILS = (CONCAT(VS_EMAILS,';'));
 					END IF;
 					SET VS_EMAILS = (CONCAT(VS_EMAILS,VS_EMAILS_DEPTO));
                 END IF;
                 
 				IF (TRIM(VS_EMAILS_USERCLI)) > '' THEN
 					IF (TRIM(VS_EMAILS)) > '' THEN
 						SET VS_EMAILS = (CONCAT(VS_EMAILS,';'));
 					END IF;
 					SET VS_EMAILS = (CONCAT(VS_EMAILS,VS_EMAILS_USERCLI));
 				END IF;
 				
 
 			END IF;
 			
 		UNTIL VI_PARAR
 		END REPEAT;
         
 		IF (TRIM(VS_EMAILS)) > '' THEN
 			SET VS_ASSUNTO = (CONCAT('[GVM Sistemas] Chamado# ', cast(new.id as char), ' - Alteração para situação: ', VS_OCORREN_PARA));
 			
 			SELECT 
 			(CONCAT('Cliente: ',C.CLIENTE,' - ',TRIM(U.NOME),'<br>','Usuário Criador: ', TRIM(CRIADOR.NOME),'<br>','Usuário Responsável: ', TRIM(RESPON.NOME),'<br>','Titulo: ', trim(c.titulo),'<br>','Sistema: ', trim(sistemas.nome)  )) CORPO_TITULO
 			INTO VS_CORPO_TITULO 
 			FROM CHAMADOS C 
 			LEFT JOIN USUARIO_SITE U ON U.ID = C.CLIENTE
 			LEFT JOIN USERCLI CRIADOR ON CRIADOR.ID = C.ID_USER_CHAM
 			LEFT JOIN USERCLI RESPON ON RESPON.ID = C.ID_USER_RESP
             LEFT JOIN SISTEMAS ON SISTEMAS.ID = C.ID_SISTEMA
 			WHERE 
 			C.ID = NEW.ID;
             
             
 			SET VS_CORPO_TEXTO = trim(new.chamado);
             
             
 			INSERT INTO `gvmsistemas`.`email` (`remetente`, `dests`, `assunto`, `data_criacao`,`corpo_titulo`,`corpo_texto`,`id_chamado`) VALUES
 			('chamados@gvmsistemas.com.br',VS_EMAILS,VS_ASSUNTO,now(),VS_CORPO_TITULO,VS_CORPO_TEXTO,NEW.ID);
 		
		 
		 
		 
		 END IF;
	 END IF;
 END