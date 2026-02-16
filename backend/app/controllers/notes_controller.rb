class NotesController < ApplicationController
  before_action :set_note, only: %i[ show update destroy ]

  # GET /notes
  def index
    @notes = Note.all
    @notes = @notes.where(group_id: params[:group_id]) if params[:group_id].present?
    @notes = @notes.order(updated_at: :desc)

    render json: @notes
  end

  # GET /notes/1
  def show
    render json: @note
  end

  # POST /notes
  def create
    @note = Note.new(note_params)

    if @note.save
      render json: @note, status: :created, location: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /notes/1
  def update
    if @note.update(note_params)
      render json: @note
    else
      render json: @note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /notes/1
  def destroy
    @note.destroy
  end

  private

  def set_note
    @note = Note.find(params[:id])
  end

  def note_params
    params.expect(note: [ :title, :content, :group_id ])
  end
end
