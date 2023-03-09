import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Header from './components/header'
import Footer from './components/footer'

import Icon from './assets/img/icon.png'
import './App.css'

export default function App() {
  const { register, setValue, setFocus } = useForm()

  function checkCep(e) {
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json()).then((data) => {
        setValue('address', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
        if (data.logradouro) {
          setFocus('number');
        } else {
          setFocus('address');
        }
      });
  }

  return (
    <div className="container">
      <Header icon={Icon} />

      <main className="main">
        <form className="form">
          <div className="icon">
            <img src={Icon} alt="Icon" width="20%" />
          </div>

          <div className="field">
            <span>CEP</span>
            <input
              type="text"
              placeholder="Digite o CEP"
              className="input"
              {...register('cep')}
              onBlur={checkCep}
            />
          </div>

          <div className="field">
            <span>Rua</span>
            <input
              type="text"
              className="input"
              {...register('address')}
            />
          </div>

          <div className="field">
            <span>Número</span>
            <input
              type="text"
              className="input"
              {...register('number')}
            />
          </div>

          <div className="field">
            <span>Bairro</span>
            <input
              type="text"
              className="input"
              {...register('neighborhood')}
            />
          </div>

          <div className="field">
            <span>Cidade</span>
            <input
              readOnly
              type="text"
              className="input"
              {...register('city')}
            />
          </div>

          <div className="field" style={{ marginBottom: '0px' }}>
            <span>Estado</span>
            <input
              readOnly
              type="text"
              className="input"
              {...register('state')}
            />
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}