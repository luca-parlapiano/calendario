import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import moment from 'moment'
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

import GraficoLinea from './components/GraficoLinea'
import Colors from './constants/Colors'
import Day from './model/day';

LocaleConfig.locales['it'] = {
  monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
  monthNamesShort: ['Gen.', 'Feb.', 'Mar', 'Aprile', 'Maggio', 'Giu', 'Lug.', 'Ago', 'Set.', 'Ott.', 'Nov.', 'Dic.'],
  dayNames: ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mer.', 'Gio.', 'Ven.', 'Sab.']
};

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const App = () => {
  LocaleConfig.defaultLocale = 'it';

  /*
  Creazione Archivio Dettagli
  */

  const array_random = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100]

  const archivio = [
    { data: formatDate(new Date(2021, 0, 20)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 21)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 22)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 23)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 24)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 25)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 26)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 27)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 28)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 29)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 19)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 17)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 16)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
    { data: formatDate(new Date(2021, 0, 14)), oxygen: array_random, respirazione: array_random, heart_rate: array_random, heart_variation: array_random },
  ]

  let date_da_convertire = [] //Date filtrate per per

  const addingToArray = input => {
    date_da_convertire.push(input)
  }

  const mesiIT = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno"]
  //Regola lo stato per i grafici
  const [datiOxygen, setDatiOxygen] = useState([0,0,0,0]);
  const [datiRespiration, setDatiRespiration] = useState([0,0,0,0]);
  const [datiHeartRate, setDatiHeartRate] = useState([0,0,0,0]);
  const [datiHeartVariation, setDatiHeartVariation] = useState([0,0,0,0]);

  //Salva l'intervallo di tempo per la ricerca 
  const [selected, setSelected] = useState([]); 

  //Stato per la gestione del calendario
  const [isStartDatePicked, setStartDatePicked] = useState(false)
  const [MarkedDates, setMarkedDates] = useState({})
  const [isEndDatePicked, setIsEndDatePicked] = useState(false)
  const [startDate, setStartDate] = useState('')

  let markedDates_temp = {}
  const onDayPress = (day) => {
    if (isStartDatePicked == false) {

      markedDates_temp[day.dateString] = { startingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
      addingToArray(day.dateString)
      setMarkedDates(markedDates_temp)
      setStartDatePicked(true)
      setIsEndDatePicked(false)
      setStartDate(day.dateString)

    } else {

      //let markedDates = MarkedDates //Input Da rivedere colora solo il primo valore della selezione
      let markedDates = [] //Colora tutta la selezione la lascia fuori il primo valore
      let startDat = moment(startDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(startDat, 'days')

      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = startDat.add(1, 'day');
          tempDate = moment(tempDate).format('YYYY-MM-DD')
          console.log("Data" + tempDate)
          if (i < range) {
            markedDates[tempDate] = { color: '#00B0BF', textColor: '#FFFFFF' };
            addingToArray(tempDate)
            console.log("Data" + markedDates[tempDate])
          } else {
            markedDates[tempDate] = { endingDay: true, color: '#00B0BF', textColor: '#FFFFFF' };
            addingToArray(tempDate)
          }
        }
      } else {
        alert("Range negativo")
      }

      console.log("Sto per salvare " + date_da_convertire)
      setSelected(date_da_convertire)
      setMarkedDates(markedDates)
      setStartDatePicked(false)
      setIsEndDatePicked(true)
      setStartDate('')

    }
  }

  const clearSelection = () => {
    setMarkedDates({})
  }

  const showSelection = () => {
    console.log("Dati Salvati")
    console.log(selected)
    let firstNumber = selected[0]
    let lastNumber = selected[selected.length - 1]
    searchValue(firstNumber, lastNumber, archivio)
  }

  const searchValue = (firstNumber, lastNumber, Archivio) => {
    
    //Data di inizio
    var dataInizio = new Date(firstNumber)
    let meseInizio = dataInizio.getMonth()+1
    let giornoInizio = dataInizio.getDate()

    //Data di fine conteggio
    var lastNumber = new Date(lastNumber)
    let meseFine = lastNumber.getMonth()+1
    let giornoFine = lastNumber.getDate()

    for (let i = 0; i < Archivio.length; i++) {
      let itemObj = Archivio[i]
      var d = new Date(itemObj.data)
      let month =  d.getMonth()+1;
      var day = d.getDate();

      //console.log("Mese " + month +"  Day "+ day)
      if((giornoInizio <= day) && (giornoFine >= day)){
        console.log("Primo "+ giornoInizio+" Secondo "+ giornoFine+" Mese " + month +"  Day "+ day)
        console.log(itemObj.oxygen),
        console.log(itemObj.respirazione),
        console.log(itemObj.heart_rate),
        console.log(itemObj.heart_variation)
        setDatiOxygen(itemObj.oxygen)
        setDatiRespiration(itemObj.respirazione)
        setDatiHeartRate(itemObj.heart_rate)
        setDatiHeartVariation(itemObj.heart_variation)
      }
    }
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View>
          <Calendar
            markingType="period"
            onDayPress={onDayPress}
            markedDates={MarkedDates}
          />
          <View style={styles.double_button}>
            <Button title={'Clear Selection'} onPress={clearSelection} color={'red'} />
            <Button title={'Mostra Dati'} onPress={showSelection} color={'green'} />
          </View>

        </View>
        <View>
          <View >
            <Text style={styles.title}>OXYGENATION</Text>
          </View>
          <GraficoLinea
            mesi={mesiIT}
            data={datiOxygen}
            backgroundColor={Colors.OXY_backgroundColor}
            backgroundGradientFrom={Colors.OXY_backgroundGradientFrom}
            backgroundGradientTo={Colors.OXY_backgroundGradientTo}
            yAxisLabel={''}
            yAxisSuffix={'k'}
          />
        </View>
        <View>
          <View >
            <Text style={styles.title}>RESPIRATION</Text>
          </View>
          <GraficoLinea
            mesi={mesiIT}
            data={datiRespiration}
            backgroundColor={Colors.RES_backgroundColor}
            backgroundGradientFrom={Colors.RES_backgroundGradientFrom}
            backgroundGradientTo={Colors.RES_backgroundGradientTo}
            yAxisLabel={''}
            yAxisSuffix={'k'}
          />
        </View>
        <View>
          <View >
            <Text style={styles.title}>HEART RATE</Text>
          </View>
          <GraficoLinea
            mesi={mesiIT}
            data={datiHeartRate}
            backgroundColor={Colors.H_RATE_backgroundColor}
            backgroundGradientFrom={Colors.H_RATE_backgroundGradientFrom}
            backgroundGradientTo={Colors.H_RATE_backgroundGradientTo}
            yAxisLabel={''}
            yAxisSuffix={'k'}
          />
        </View>
        <View>
          <View >
            <Text style={styles.title}>HEART VARIATION</Text>
          </View>
          <GraficoLinea
            mesi={mesiIT}
            data={datiHeartVariation}
            backgroundColor={Colors.H_VARI_backgroundColor}
            backgroundGradientFrom={Colors.H_VARI_backgroundGradientFrom}
            backgroundGradientTo={Colors.H_VARI_backgroundGradientTo}
            yAxisLabel={''}
            yAxisSuffix={'k'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
  },
  calendar: {
    marginBottom: 10
  },
  double_button: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around'
  }
});

export default App;
