const patio_motivo = () => {
   let vpatio_motivo = {
      data: [
         {
           CdMotivo: 1,
           DsMotivo: "DESCARREGAR *",
           DsApelido: "DESCARREGA *",
           InTipoDocMotivoES: 0
         },
         {
           CdMotivo: 2,
           DsMotivo: "ENTREGA *",
           DsApelido: "ENTREGA *",
           InTipoDocMotivoES: 0
         },
         {
           CdMotivo: 3,
           DsMotivo: "MANUTENÇÃO *",
           DsApelido: "MANUTENÇÃO *",
           InTipoDocMotivoES: 2
         }
       ],
     }
   return vpatio_motivo
}

export default patio_motivo