import React, {useState,useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View,FlatList, Image,Text,TouchableOpacity} from 'react-native';
//TouchableOpacity tipo um button
//showsVerticalScrollIndicator={false} tira a "faixa do scroll" da lateral
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';


export default function Incidents() {  

   const [incidents,setIncidents] = useState([]);
   const [total,setTotal] = useState(0);//total dos incidents
   const [page,setPage] = useState(1);//inicia na página 1
   const [loading,setLoading] = useState(false);
   const navigation = useNavigation();
  
//paginação
async function loadIncidents(){
 //valida se a requisição já foi feita ou não, para evitar repetição de dadoss
  if (loading){
    return;
  }

  if (total >0 && incidents.length == total){
   return;
  }
  setLoading(true);//faz a leitura dos dados
}
//navega para a página de detalhe - fazendo um scroll infinito, aquele que quando chega ao final ele continua a mostrar o restante do conteudo
   function navigateToDetail(incident){
     navigation.navigate('Detail',{incident}) ; 
   } 

  //fazer a conexão com o banco
  async function loadIncidents(){
  const response = await api.get('incidents', {
    params : { page }
  })

  //setIncidents(response.data);
  //controle de apresentaçao das páginas e dados
  setIncidents([...incidents,...response.data]);//dois vetores
  setTotal(response.headers['x-total_count']);
  setPage(page + 1);
  setLoading(false);
  }

  useEffect(()=>{
    loadIncidents();
  },[]);

  return(
  <View style={styles.container}>
    <View style={styles.header}>  
     <Image source={logoImg}></Image>
     <Text style={styles.headerText}>
         Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
     </Text>
    </View>

    <Text style={styles.title}>Bem - Vindo!</Text>
    <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

     <FlatList install intl
       // data={[1,2,3]}
       data={incidents}
        style={styles.incidentList}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2} //20% da lista vai apresentar
        keyExtractor={incident=> String(incident.id)}
        renderItem = {({ item: incident }) => (
          <View style={styles.incident}>
              <Text style={styles.incidentProperty}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name}</Text>

              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>
               {Intl.NumberFormat('pt-BR',{style:'currency',currency: 'BRL'}).format(incident.value)}
              </Text>


            <TouchableOpacity 
              style={styles.detailsButton} 
              onPress={() =>navigateToDetail(incident)}
              >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#E02043"/>
            </TouchableOpacity>
          </View>

        )}
     
     />
 
  </View>

    ) ; 
  }


