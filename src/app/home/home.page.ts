import { Component } from '@angular/core';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  segment = 'todo'; // 'todo' ou 'done'
  mostrarFormulario = false;

  notas = [
    {
      id: 1,
      titulo: 'Levar o carro à inspeção',
      descricao: 'Ir ao centro de inspeções antes de sexta-feira.',
      estado: 'TO DO',
      prioridade: 'Alta'
    },
    {
      id: 2,
      titulo: 'Pagar o Moche',
      descricao: 'Pagamento mensal do coworking.',
      estado: 'TO DO',
      prioridade: 'Média'
    },
    {
      id: 3,
      titulo: 'Estudar para a UC de Mobile',
      descricao: 'Rever slides e práticas; preparar resumo.',
      estado: 'TO DO',
      prioridade: 'Alta'
    }
  ];

  // formulário para nova/edição
  novaNota = {
    id: 0,
    titulo: '',
    descricao: '',
    estado: 'TO DO',
    prioridade: 'Média'
  };

  // nota atualmente selecionada para modal
  notaSelecionada: any = null;
  editando = false;

  get notasFiltradas() {
    return this.notas.filter(n => (this.segment === 'todo' ? n.estado === 'TO DO' : n.estado !== 'TO DO'));
  }

  abrirDetalhes(nota: any) {
    // cria cópia para não modificar diretamente até o utilizador confirmar alterações
    this.notaSelecionada = { ...nota };
  }

  fecharDetalhes() {
    this.notaSelecionada = null;
    this.editando = false;
  }

  marcarComoConcluida(nota: any) {
    const idx = this.notas.findIndex(n => n.id === nota.id);
    if (idx > -1) {
      this.notas[idx].estado = (this.notas[idx].estado === 'TO DO') ? 'DONE' : 'TO DO';
      this.fecharDetalhes();
    }
  }

  abrirFormularioParaCriar() {
    this.mostrarFormulario = true;
    this.novaNota = { id: this._nextId(), titulo: '', descricao: '', estado: 'TO DO', prioridade: 'Média' };
  }

  abrirFormularioParaEditar(nota: any) {
    this.mostrarFormulario = true;
    this.editando = true;
    this.novaNota = { ...nota };
  }

  guardarNota() {
    if (!this.novaNota.titulo?.trim()) {
      return;
    }
    if (this.editando) {
      const idx = this.notas.findIndex(n => n.id === this.novaNota.id);
      if (idx > -1) this.notas[idx] = { ...this.novaNota };
    } else {
      this.notas.push({ ...this.novaNota });
    }
    this.mostrarFormulario = false;
    this.editando = false;
    this.novaNota = { id: 0, titulo: '', descricao: '', estado: 'TO DO', prioridade: 'Média' };
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
    this.editando = false;
    this.novaNota = { id: 0, titulo: '', descricao: '', estado: 'TO DO', prioridade: 'Média' };
  }

  eliminarNota(id: number) {
    this.notas = this.notas.filter(n => n.id !== id);
    this.fecharDetalhes();
  }

  private _nextId() {
    return this.notas.reduce((max, n) => Math.max(max, n.id), 0) + 1;
  }
}
