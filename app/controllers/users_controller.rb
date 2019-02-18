class UsersController < ApplicationController

    def index
        @users = User.all        
    end

    def show
        @user = User.find(params[:id])
    end

    def new

    end

    def create
        
    end

    def edit
        
    end

    def update
        
    end

    def destroy
        
    end

    private

    def user_params
        params.require(:user).permit(:name, :username, :password)
    end

    def find_user
        @user = User.find(params[:id])
    end
    
end
