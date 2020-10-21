<template>
  <div>
      <b-breadcrumb :items="items" class="my-2 bg-app-color"></b-breadcrumb>

      <div v-if="loadingMail" class="d-flex justify-content-center align-items-center" style="height: 200px">
        <loading></loading>
      </div>

      <b-row v-else>
        <b-col cols="12" lg="8" order="2" order-lg="1">

          <div class="card">
            

            <div class="card-header d-flex justify-content-end">
              <b-button variant="success" size="sm" @click="save">
                <b-icon icon="check" shift-v="-1"></b-icon> Salvar
              </b-button>
              <b-button variant="outline-secondary" size="sm" class="ml-2" @click="reload()">Cancelar</b-button>
            </div>

            <div class="card-body">

              <b-form-group label="Remetente" label-for="input-1">
                <b-form-input id="input-1" v-model="email.remetente" trim></b-form-input>
              </b-form-group>

              <b-form-group label="Destinatário" label-for="input-2">
                <b-form-input id="input-2" v-model="email.dests" trim></b-form-input>
                <small>Para mais destinatários separar por ponto e vírgula(;)</small>
              </b-form-group>

              <b-form-group label="Assunto" label-for="input-3">
                <b-form-input id="input-3" v-model="email.assunto" trim></b-form-input>
              </b-form-group>

              <b-form-group label="Conteúdo" label-for="textarea">
                <b-form-textarea id="textarea" v-model="email.corpo_texto" rows="8"></b-form-textarea>
              </b-form-group>
            
            </div>

            <div class="card-body">
               Anexos

              <b-form-file 
                v-model="files"
                :state="Boolean(files)"
                placeholder="Clique aqui arraste e solte seus arquivos..."
                drop-placeholder="Solte seu arquivo aqui..."
                :multiple="true"
                :file-name-formatter="formatNames"
                @input="formFiles.push($event)"
              >
                <template slot="file-name" slot-scope="{ names }">
                  <b-badge variant="dark">{{ names[0] }}</b-badge>
                  <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                    + {{ names.length - 1 }} More files
                  </b-badge>
                </template>
              </b-form-file>
             </div>
          </div>

        </b-col>
        <b-col cols="12" lg="4" order="1" order-lg="2">

          <div class="card mb-2">
            <div class="card-header d-flex justify-content-end">
              <b-button variant="success" size="sm" @click="goToNewEmailPage()">
                <b-icon icon="plus" shift-v="-1"></b-icon> Novo
              </b-button>
              <b-dropdown text="Opções" class="ml-2" variant="outline-secondary">
                <b-dropdown-item @click="openEmailPreviewModal(email.id)">Visualizar Prévia</b-dropdown-item>
                <b-dropdown-item @click="sendEmail(email.id)">Enviar E-mail</b-dropdown-item>
              </b-dropdown>
            </div>

            <div class="card-body">
              <b-row v-if="email.id">
                <b-col cols="4">
                 <label-without-input label="ID" :field="email.id"></label-without-input>
                </b-col>

                <b-col cols="8">
                 <label-without-input label="Status" :field="email.status"></label-without-input>
                </b-col>

                <b-col cols="4">
                 <label-without-input label="Enviado" :field="sendedString"></label-without-input>
                </b-col>

                <b-col cols="8">
                 <label-without-input label="Data Envio" :field="toDate(email.data_envio)"></label-without-input>
                </b-col>

                <b-col cols="4">
                 <label-without-input label="Retornado" :field="returnedString"></label-without-input>
                </b-col>

                <b-col cols="8">
                 <label-without-input label="Data Retorno" :field="toDate(email.data_retorno)"></label-without-input>
                </b-col>

                <b-col cols="12">
                 <label-without-input label="Retorno" :field="email.retorno"></label-without-input>
                </b-col>
              </b-row>
            </div>
          </div>

        </b-col>
      </b-row>

    <emails-preview-modal ref="emailsPreviewModal"></emails-preview-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LabelWithoutInput from '../../components/Forms/LabelWithoutInput';
import EmailsPreviewModal from './components/Modals/EmailsPreviewModal';
import Loading from '../../components/Loading';

export default {
  components: {
    LabelWithoutInput,
    EmailsPreviewModal,
    Loading
  },
  data() {
    return {
      items: [
        { text: 'Home', href: '/home' },
        { text: 'E-mails', to: { name: 'emails' } },
        { text: 'Cadastro de E-mails', active: true }
      ],
      files: [],
      formFiles: []
    }
  },

  computed: {
    ...mapGetters('emails', ['email', 'loadingMail']),

    sendedString() {
      return this.email.enviado ? 'Sim' : 'Não';
    },

    returnedString() {
      return this.email.retornado ? 'Sim' : 'Não';
    }
  },

  methods: {
    ...mapActions('emails', ['getById', 'clearEmail', 'sendEmail', 'updateEmail', 'createEmail']),

    toDate(dateToFormat) {
      if(!dateToFormat) return null;
      let date = new Date(dateToFormat);
      return date.toLocaleString();
    },

    openEmailPreviewModal(id) {
      this.$refs.emailsPreviewModal.showPreviewModal(id);
    },

    save() {
      if(this.formFiles.length > 0) {
        this.email.files = this.formFiles;
      }

      if(this.email.id > 0) {
        this.updateEmail(this.email);
      } else {
        this.createEmail(this.email);
      }
    },

    goToNewEmailPage() {
      this.$router.push({ name: 'emailsCreate' });
    },

    reload() {
      location.reload()
    },

    formatNames(files) {
      return files.length === 1 ? files[0].name : `${files.length} files selected`
    },

  },

  created() {
    console.log('Entrou na tela:', this.$route.params.id)
    let id = this.$route.params.id;

    if(id) {
      this.getById(id);
    } else {
      this.clearEmail();
    }
      
  }
}
</script>

<style lang="scss" scoped>
  .bg-app-color {
    background-color: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0,0,0,0.1);
  }
</style>