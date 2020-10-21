<template>
	<div class="mt-2">
		<div class="card mb-2">
			<div class="card-body">
				<div class="row">
					<div class="col">
						<svg width="8em" height="8em" viewBox="0 0 16 16" class="bi bi-power text-success" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z"/>
							<path fill-rule="evenodd" d="M7.5 8V1h1v7h-1z"/>
						</svg>
						<p><strong>Status</strong></p>
					</div>
					
					<div class="col ">
						<div style="margin: 10px;"><canvas data-bs-chart="{&quot;type&quot;:&quot;line&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;January&quot;,&quot;February&quot;,&quot;March&quot;,&quot;April&quot;,&quot;May&quot;,&quot;June&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;Revenue&quot;,&quot;backgroundColor&quot;:&quot;#4e73df&quot;,&quot;borderColor&quot;:&quot;#4e73df&quot;,&quot;data&quot;:[&quot;4500&quot;,&quot;5300&quot;,&quot;6250&quot;,&quot;7800&quot;,&quot;9800&quot;,&quot;15000&quot;],&quot;fill&quot;:true}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:true,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{}}}"></canvas></div>
					</div>
					<div class="col ">
						<div style="margin: 10px;"><canvas data-bs-chart="{&quot;type&quot;:&quot;bar&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;January&quot;,&quot;February&quot;,&quot;March&quot;,&quot;April&quot;,&quot;May&quot;,&quot;June&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;Revenue&quot;,&quot;backgroundColor&quot;:&quot;#4e73df&quot;,&quot;borderColor&quot;:&quot;#4e73df&quot;,&quot;data&quot;:[&quot;4500&quot;,&quot;5300&quot;,&quot;6250&quot;,&quot;7800&quot;,&quot;9800&quot;,&quot;15000&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:true,&quot;legend&quot;:{&quot;display&quot;:false},&quot;title&quot;:{}}}"></canvas></div>
					</div>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-body">
				<div class="row">
					<div class="col">
						<h1 class="text-left" style="padding: 10px;color: rgb(164,164,164);font-size: 27px;padding-bottom: 0px;margin-right: 10px;margin-left: 10px;">Últimos e-mails enviados</h1>
					</div>
				</div>

				<div class="row" style="padding: 15px;padding-bottom: 10px;padding-top: 0px;">
					<div class="col">
						<div class="table-responsive">
							<table class="table">
								<thead>
									<tr>
										<th>id</th>
										<th>Remetente</th>
										<th>Destinatário</th>
										<th>Assunto</th>
										<th>Data Envio</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="email in lastFiveSendedMails" :key="email.id">
										<td>{{email.id}}</td>
										<td>{{email.remetente}}</td>
										<td>{{email.dests}}</td>
										<td>{{email.assunto}}</td>
										<td>{{toDate(email.data_envio)}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    computed: {
		...mapGetters('emails', ['lastFiveSendedMails'])
	},

	methods: {
		...mapActions('emails', ['getLastFiveSendedMails']),
		toDate(date) {
			let newDate = new Date(date);
			return newDate.toLocaleString();
		}
	},

	created() {
		this.getLastFiveSendedMails();
	}
  }
</script>